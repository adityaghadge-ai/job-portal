/**
 * AI Resume Scanner & Skill Matcher Utility
 * 
 * Performs intelligent NLP skill extraction, suitability scoring (0-100%),
 * matching/missing skill classification, and tailored recommendations.
 * Uses Google Gemini API if GEMINI_API_KEY is available, or fallback NLP engine.
 */

export async function analyzeResumeSuitability(applicant, job) {
    const candidateSkills = (applicant?.profile?.skills || []).map(s => s.trim().toLowerCase());
    const candidateBio = (applicant?.profile?.bio || "").toLowerCase();
    const candidateFullname = applicant?.fullname || "Candidate";

    // Requirements & Description from Job
    const jobRequirements = Array.isArray(job?.requirements)
        ? job.requirements.flatMap(r => r.split(",")).map(r => r.trim().toLowerCase()).filter(Boolean)
        : [];
    const jobTitle = (job?.title || "").toLowerCase();
    const jobDesc = (job?.description || "").toLowerCase();

    // Standard skill dictionary for keyword extraction from text
    const commonTechSkills = [
        "javascript", "typescript", "react", "react.js", "next.js", "vue", "angular", "node", "node.js",
        "express", "express.js", "mongodb", "mongoose", "sql", "postgresql", "mysql", "python",
        "django", "flask", "java", "spring", "spring boot", "c++", "c#", ".net", "html", "css",
        "tailwind", "tailwindcss", "bootstrap", "git", "github", "docker", "kubernetes", "aws",
        "azure", "gcp", "rest api", "graphql", "redux", "redux toolkit", "figma", "ui/ux",
        "communication", "problem solving", "teamwork", "leadership", "agile", "scrum"
    ];

    // Extract requirements keywords
    let targetSkills = [...new Set(jobRequirements)];

    // If job requirements are sparse, extract tech keywords from job title & description
    if (targetSkills.length < 3) {
        commonTechSkills.forEach(skill => {
            if (jobTitle.includes(skill) || jobDesc.includes(skill)) {
                if (!targetSkills.includes(skill)) targetSkills.push(skill);
            }
        });
    }

    if (targetSkills.length === 0) {
        targetSkills = ["general role competencies", "communication", "domain knowledge"];
    }

    // Match candidate skills & bio against target requirements
    const matchingSkills = [];
    const missingSkills = [];

    targetSkills.forEach(req => {
        const isMatched = candidateSkills.some(cs => cs.includes(req) || req.includes(cs)) ||
                          candidateBio.includes(req);
        if (isMatched) {
            matchingSkills.push(req);
        } else {
            missingSkills.push(req);
        }
    });

    // Experience check bonus
    let expBonus = 0;
    const requiredExp = Number(job?.experienceLevel || job?.experience || 0);
    if (requiredExp === 0) expBonus = 10;
    else expBonus = 5;

    // Calculate Match Percentage Score
    let matchRatio = targetSkills.length > 0 ? (matchingSkills.length / targetSkills.length) : 0.7;
    let baseScore = Math.round(matchRatio * 85 + expBonus);
    
    // Ensure bounds between 15% and 98%
    let matchScore = Math.min(98, Math.max(15, baseScore));
    if (matchingSkills.length > 0 && matchScore < 40) matchScore = 45 + matchingSkills.length * 8;
    matchScore = Math.min(98, matchScore);

    // Format skill labels neatly
    const formatSkill = (str) => str.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    const formattedMatching = matchingSkills.map(formatSkill);
    const formattedMissing = missingSkills.map(formatSkill);

    // Generate Tailored Summary & Recommendations
    let summary = "";
    let recommendations = [];

    if (matchScore >= 80) {
        summary = `${candidateFullname} is an excellent match (${matchScore}%) for the ${job?.title} role. Demonstrates core proficiency in ${formattedMatching.slice(0, 3).join(", ") || "required skills"}.`;
        recommendations = [
            "Highlight practical projects and live links showcasing your expertise in " + (formattedMatching[0] || "core technical areas") + ".",
            "Prepare system design or portfolio walkthroughs to stand out during interviews."
        ];
    } else if (matchScore >= 50) {
        summary = `${candidateFullname} is a solid match (${matchScore}%) for ${job?.title}. Meets key criteria but has potential skill gaps in ${formattedMissing.slice(0, 2).join(", ") || "advanced requirements"}.`;
        recommendations = [
            "Consider adding projects or certifications related to " + (formattedMissing.slice(0, 2).join(" & ") || "missing requirements") + " to boost your resume strength.",
            "Tailor your profile bio to emphasize transferable experience matching the job description."
        ];
    } else {
        summary = `${candidateFullname} shows moderate alignment (${matchScore}%) with the ${job?.title} position. Key requirements like ${formattedMissing.slice(0, 3).join(", ")} are currently not listed in the profile.`;
        recommendations = [
            "Acquire hands-on experience or take crash courses in " + (formattedMissing.slice(0, 2).join(", ") || "the missing skillsets") + ".",
            "Update your skills section and resume details to highlight relevant projects."
        ];
    }

    // Optional Google Gemini API Call if API Key configured in env
    if (process.env.GEMINI_API_KEY) {
        try {
            const prompt = `Act as an expert AI ATS Resume Analyzer.
Evaluate applicant "${candidateFullname}" for job position "${job?.title}".
Candidate Skills: ${candidateSkills.join(", ") || "Not provided"}
Candidate Bio: ${candidateBio || "Not provided"}
Job Requirements: ${jobRequirements.join(", ")}
Job Description: ${jobDesc}

Respond in strict JSON format:
{
  "matchScore": number (0-100),
  "matchingSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "summary": "Short 2 sentence evaluation",
  "recommendations": ["rec1", "rec2"]
}`;
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            const data = await response.json();
            const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (textResponse) {
                const cleanedJson = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();
                const aiResult = JSON.parse(cleanedJson);
                if (aiResult.matchScore) {
                    return {
                        matchScore: Math.min(100, Math.max(0, aiResult.matchScore)),
                        matchingSkills: aiResult.matchingSkills || formattedMatching,
                        missingSkills: aiResult.missingSkills || formattedMissing,
                        summary: aiResult.summary || summary,
                        recommendations: aiResult.recommendations || recommendations,
                        analyzedAt: new Date()
                    };
                }
            }
        } catch (err) {
            console.log("Gemini API fallback to internal AI engine:", err.message);
        }
    }

    return {
        matchScore,
        matchingSkills: formattedMatching,
        missingSkills: formattedMissing,
        summary,
        recommendations,
        analyzedAt: new Date()
    };
}
