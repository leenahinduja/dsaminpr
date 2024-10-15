// Priority queue to store jobs
class Job {
    constructor(name, priority) {
        this.name = name;
        this.priority = priority;
    }
}

// Custom comparator for job priority (higher priority first)
class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(job) {
        if (this.isEmpty()) {
            this.queue.push(job);
        } else {
            let added = false;
            for (let i = 0; i < this.queue.length; i++) {
                if (job.priority > this.queue[i].priority) {
                    this.queue.splice(i, 0, job);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.queue.push(job);
            }
        }
    }

    dequeue() {
        return this.queue.shift();
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    size() {
        return this.queue.length;
    }

    clear() {
        this.queue = [];
    }
}

// Global job queue
const jobQueue = new PriorityQueue();

// Function to add a job
function addJob() {
    const jobName = document.getElementById('jobName').value;
    const jobPriority = parseInt(document.getElementById('jobPriority').value);

    if (jobName && !isNaN(jobPriority)) {
        const newJob = new Job(jobName, jobPriority);
        jobQueue.enqueue(newJob);
        updateJobQueueDisplay();
        document.getElementById('jobName').value = '';
        document.getElementById('jobPriority').value = '';
    } else {
        alert('Please enter a valid job name and priority.');
    }
}

// Function to execute all jobs in the queue
function executeJobs() {
    const executionLog = document.getElementById('executionLog');
    executionLog.innerHTML = '';

    while (!jobQueue.isEmpty()) {
        const job = jobQueue.dequeue();
        const logItem = document.createElement('li');
        logItem.textContent = `Executed: ${job.name} (Priority: ${job.priority})`;
        executionLog.appendChild(logItem);
    }
    updateJobQueueDisplay();
}

// Function to update the job queue display
function updateJobQueueDisplay() {
    const jobQueueDisplay = document.getElementById('jobQueue');
    jobQueueDisplay.innerHTML = '';

    for (const job of jobQueue.queue) {
        const listItem = document.createElement('li');
        listItem.textContent = `${job.name} (Priority: ${job.priority})`;
        jobQueueDisplay.appendChild(listItem);
    }
}
