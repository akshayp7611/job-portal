import { Job } from "../models/job.model.js";
//admin or company can post a job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body; //destructuring the request body
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "New job created successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};
//get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keywords || ""; //keywords from query
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 }); //populate company name
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};
//student can apply for the job
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id; //job id from params
    const job = await Job.findById(jobId).populate({
      path: "applications",
    }); //populate company name
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};

//admin ya company ke liye
//get all jobs created by admin or company
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id; //logged in user id
    const jobs = await Job.find({ created_by: adminId }).populate({
      path:'company',
    })//populate company name
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};
