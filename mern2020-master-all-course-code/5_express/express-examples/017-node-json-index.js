const express = require('express');
const app = express();
const data = require("./data/company.json");
const port = process.env.PORT || 8080;

app.get("/jobExperience/:jobId", (req, res) => {
	let foundJob = false;

	for (let i in data.jobs) {
		const job = data.jobs[i];

		if (job.id == req.params.jobId) {
			console.log(`Found job id: ${req.params.jobId}`);

			foundJob = true;
			res.status(200).json({"exp-years": job.experience});
		}
	}

	if (!foundJob) {
		res.status(200).json({"error": "Job not found"});
	}
});

app.listen(port);
console.log(`listening on port ${port}`);