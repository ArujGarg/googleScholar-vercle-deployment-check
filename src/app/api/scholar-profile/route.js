import { NextResponse } from "next/server"
import * as cheerio from "cheerio"

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map()

function checkRateLimit(ip) {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 10

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  const record = rateLimitStore.get(ip)
  if (now > record.resetTime) {
    record.count = 1
    record.resetTime = now + windowMs
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

function sanitizeInput(input) {
  // Basic input sanitization
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
}

async function scrapeScholarProfile(profileUrl) {
  try {
    // Add user agent to avoid blocking
    const response = await fetch(profileUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    const profileData = {
      name: "",
      affiliation: "",
      totalCitations: 0,
      hIndex: 0,
      researchInterests: [],
      publications: [],
    }

    // Extract name
    profileData.name = $("#gsc_prf_in").text().trim()

    // Extract affiliation
    profileData.affiliation = $(".gsc_prf_il").first().text().trim()

    // Extract research interests
    $(".gsc_prf_int").each((i, elem) => {
      const interest = $(elem).text().trim()
      if (interest) {
        profileData.researchInterests.push(interest)
      }
    })

    // Extract citation metrics
    $(".gsc_rsb_std").each((i, elem) => {
      const value = Number.parseInt($(elem).text().replace(/,/g, "")) || 0
      if (i === 0) profileData.totalCitations = value
      if (i === 2) profileData.hIndex = value
    })

    // Extract publications
    $(".gsc_a_tr").each((i, elem) => {
      if (i < 10) {
        // Limit to first 10 publications
        const title = $(elem).find(".gsc_a_at").text().trim()
        const authors = $(elem).find(".gsc_a_at").next().text().trim()
        const year = $(elem).find(".gsc_a_y").text().trim()
        const citations = Number.parseInt($(elem).find(".gsc_a_c").text()) || 0

        if (title) {
          profileData.publications.push({
            title,
            authors,
            year,
            citations,
          })
        }
      }
    })

    return profileData
  } catch (error) {
    console.error("Scholar scraping error:", error)
    throw new Error("Failed to fetch Google Scholar profile")
  }
}

export async function POST(request) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(",")[0] : "unknown"

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 })
    }

    const { profileUrl } = await request.json()

    if (!profileUrl) {
      return NextResponse.json({ error: "Profile URL is required" }, { status: 400 })
    }

    // Sanitize input
    const sanitizedUrl = sanitizeInput(profileUrl)

    // Validate URL
    if (!sanitizedUrl.includes("scholar.google.com")) {
      return NextResponse.json({ error: "Invalid Google Scholar URL" }, { status: 400 })
    }

    const profileData = await scrapeScholarProfile(sanitizedUrl)

    return NextResponse.json(profileData)
  } catch (error) {
    console.error("Scholar profile API error:", error)
    return NextResponse.json(
      { error: "Can not Google Scholar profile. Please check the URL and try again." },
      { status: 500 },
    )
  }
}

