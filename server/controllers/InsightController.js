const Result = require("../models/Result")
const UserInsight = require("../models/UserInsight")
const {generateInterviewFeedback} = require("../services/geminiService");

const generateUserInsights = async(req,res)=>{
    try{
        console.log("USER ID:", req.user.id);
        const results = await Result.find({
            user:req.user.id
        })
        .select("overallFeedback")
        .sort({createdAt:-1})
        
        console.log("RESULT COUNT:", results.length);
        if(results.length===0){
            return res.status(200).json({
                coreStrengths: [],
                focusAreas: [],
                basedOnInterviews: 0,
            })
        }
        console.log("RESULTS:", results);
        
        const feedbackText = results.map((result,index)=>`Interview ${index+1}:\n ${result.overallFeedback}`).join("\n\n");

        const prompt = `
You are analyzing a candidate's complete interview history.

Here is the overall feedback from all of their completed interviews:

${feedbackText}

Analyze ALL of the interviews together.

Your task is to identify recurring patterns in the candidate's performance.

CORE STRENGTHS:
- Identify up to 3 skills or behaviors that the candidate consistently performs well.
- Prefer strengths that appear across multiple interviews.
- If there is not enough evidence for multiple strengths, return fewer strengths.
- Do not invent strengths.

FOCUS AREAS:
- Identify up to 3 recurring weaknesses or areas that need improvement.
- Prefer areas that appear across multiple interviews.
- If there is not enough evidence for multiple focus areas, return fewer areas.
- Do not invent weaknesses.

The descriptions should be specific to this candidate and based only on the provided feedback.

Return ONLY valid JSON in this exact format:

{
  "coreStrengths": [
    {
      "name": "Problem Solving",
      "description": "Consistently demonstrates strong analytical thinking when solving technical problems."
    }
  ],
  "focusAreas": [
    {
      "name": "Conciseness",
      "description": "Several interviews indicate that answers could be more focused and direct."
    }
  ]
}
`;

        const insights = await generateInterviewFeedback(prompt)

        console.log("Generated insights:");
        console.log(insights);

        const savedInsight = await UserInsight.findOneAndUpdate(
            { user: req.user._id },
            {
                user: req.user.id,
                coreStrengths: insights.coreStrengths,
                focusAreas: insights.focusAreas,
                basedOnInterviews: results.length,
            },
            {
                new: true,
                upsert: true,
            }
        );

        return res.status(200).json({
            coreStrengths: savedInsight.coreStrengths,
            focusAreas: savedInsight.focusAreas,
            basedOnInterviews: savedInsight.basedOnInterviews,
        });

    } catch(err){
        console.error("User insight error:", err);

        res.status(500).json({
            message:"Failed to generate Insights"
        })
    }
}

const getUserInsights = async (req, res) => {
    try {
        const userId = req.user.id;

        const insights = await UserInsight.findOne({
            user: userId
        });

        if (!insights) {
            return res.status(200).json({
                coreStrengths: [],
                focusAreas: [],
                basedOnInterviews: 0
            });
        }

        return res.status(200).json({
            coreStrengths: insights.coreStrengths,
            focusAreas: insights.focusAreas,
            basedOnInterviews: insights.basedOnInterviews
        });

    } catch (err) {
        console.error("Get insights error:", err);

        return res.status(500).json({
            message: "Failed to get insights"
        });
    }
};

module.exports = { generateUserInsights,getUserInsights };