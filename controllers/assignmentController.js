import Assignment from "../models/assignmentModel.js";

export const createAssignment = async (req, res, next) => {
  try {
    const assignment = new Assignment({ ...req.body, createdBy: req.user.id });
    await assignment.save();
    res.status(201).json({ success: true, assignment });
  } catch (err) {
    next(err);
  }
};

export const getAssignments = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    let filter = {};
    if (req.user.role === "student") {
      filter.status = "Published";
    } else if (status) {
      filter.status = status;
    }

    const assignments = await Assignment.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Assignment.countDocuments(filter);

    res.json({
      success: true,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      assignments,
    });
  } catch (err) {
    next(err);
  }
};

export const updateAssignmentStatus = async (req, res, next) => {
  try {
    const { assignmentId } = req.params;
    const { status } = req.body;

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ success: false, message: "Assignment not found" });
    }

    const validTransitions = {
      Draft: ["Published"],
      Published: ["Completed"],
      Completed: [],
    };

    if (!validTransitions[assignment.status].includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status transition from ${assignment.status} → ${status}`,
      });
    }

    assignment.status = status;
    await assignment.save();

    res.json({ success: true, assignment });
  } catch (err) {
    next(err);
  }
};

export const submitAnswer = async (req, res, next) => {
  try {
    const { assignmentId } = req.params;
    const { answer } = req.body;

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ success: false, message: "Assignment not found" });
    }

    if (assignment.status !== "Published") {
      return res
        .status(400)
        .json({ success: false, message: "Assignment is not open for submission" });
    }

    if (assignment.submittedBy) {
      return res
        .status(400)
        .json({ success: false, message: "You have already submitted this assignment" });
    }

    assignment.answer = answer;
    assignment.submittedBy = req.user.id;
    assignment.submittedDate = new Date();
    assignment.status = "Completed";

    await assignment.save();

    res.status(200).json({
      success: true,
      message: "Answer submitted successfully",
      assignment,
    });
  } catch (err) {
    next(err);
  }
};
