<h1 align="center"> KalRav </h1>

<div align="center">
  <img src="https://img.shields.io/badge/-Vite-black?style=for-the-badge&logoColor=white&logo=vite&color=646CFF" alt="vite" />
  <img src="https://img.shields.io/badge/-React_JS-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react.js" />
  <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="nodeJS"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/AI-FF6F00?style=for-the-badge&logo=artificial-intelligence&logoColor=white" alt="AI">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
</div>

<div align="center">
  An Artificial Intelligence based web application that helps monitor mental health
</div>

## 📋 Table of Contents

- [Introduction](#-introduction)
- [Tech Stack](#️-tech-stack)
- [Features](#-features)
- [Links](#-links)
- [Collaborators](#-collaborators)
- [Contribution Guidelines](#repository-contribution-guidelines)

## 🤖 Introduction

Kalrav is a web-based application equipped with a Natural Language Processing (NLP) model for continuous mental health monitoring. It enables patients to regularly log their thoughts, feelings, and experiences, providing immediate responses and generating mental health insights. The application aims to support mental health professionals in tracking patient progress and ensuring timely interventions when necessary.

## ⚙️ Tech Stack

- **Frontend:** Vite, React.js, TailwindCSS
- **Backend:** NodeJS, Express.js
- **Database:** MongoDB
- **AI/NLP:** Python, various NLP libraries and tools

## 🔋 Features

1. **Patient Interface:**

   - Chat interface for patients to log their thoughts, feelings, and experiences in text form.
   - Immediate responses to provide comfort.
   - Automatic generation of mental health insights and periodic progress reports.

2. **Backend NLP Model:**

   - **Polarity Detection:** Identifies emotional polarity (positive, neutral, or negative) and tracks sentiment trends over time.
   - **Keyword Extraction (NER):** Extracts key mental health-related phrases or entities, providing insights into recurring or significant concerns.
   - **Concern Classification:** Categorizes concerns into predefined mental health issues such as Anxiety, Depression, Stress, Insomnia, or Eating Disorders.
   - **Intensity Scoring:** Assigns a severity score (1-10) based on linguistic and contextual cues, indicating the seriousness of the user’s concerns.
   - **Timeline-Based Sentiment Shift Analysis:** Evaluates how sentiment, concerns, and intensity have evolved over a specified time period.

3. **Therapist Dashboard:**

   - Web-based admin interface for mental health professionals.
   - View patient reports containing time-series graphs, sentiment trends, and detailed analysis of the patient’s mental state.
   - Download reports in standardized formats (e.g., PDF) for further review.
   - Monitor patients' ongoing mental health and their progress or regression over time.

4. **Emergency Alert System:**
   - Threshold-based alert mechanism.
   - If the intensity score exceeds a critical level, the system triggers an alert to the therapist and emergency contacts designated by the patient.
   - Ensures timely intervention in situations involving potential self-harm or mental health crises.

## 🔗 Links

- [Project Repository](https://github.com/Kaushik-2802/mental-health-AI)
- [Live Demo](https://your-live-demo-link)

## 👨‍💻 Collaborators

- [Teja Srinivas](https://github.com/devTejaSrinivas)
- [Komaravolu Kaushik](https://github.com/Kaushik-2802)
- [Soham Chitimali](https://github.com/sohamchitimali)

# Repository Contribution Guidelines

1. **Reporting Issues**

   - Any bug, issue, feature request, etc., must be raised in the issues section of GitHub.
   - Please do not send them as WhatsApp chats.
   - Describe in detail the issue with pictures.
   - The issues will be assigned or labelled accordingly.

2. **Forking the Repository**

   - Each developer should fork the main repository instead of cloning it directly (Not Applicable for Kaushik) and then create and maintain a single local copy of the fork (on your local machine).

     ```sh
     git clone <repo-url>
     ```

     wherein repo URL is of your forked copy (Do not clone directly).

3. **Creating Branches**

   - Each developer should create a new branch in the format:
     ```sh
     --> <name>/<task working upon>
     ```
   - Examples:
     ```sh
     - teja/landingpage
     - kaushik/named-entity-recognition
     - soham/mail-feature
     ```
   - Each developer should make such branches and make changes only in those branches.
   - After all changes are done, push _only that branch_ into the GitHub Repository.
     ```sh
     git push origin <Branch Name>
     ```
   - Do not make changes to the main branch in your repo or on the GitHub repo.
   - If your branch solves some bug or addresses a feature request, make a Pull Request (PR) and mention the issue number it fixes. You can find some resources on how to do it easily online.

4. **Syncing with Main Branch**

   - Whenever you are working on the main branch, pull the changes using the below command, as others might have merged some of their branches. Follow these steps:
     1. Go to GitHub to your forked copy of your repo and then "sync" the repo to bring in the latest changes. Next, go to your local copy of the repo and do the following:
     2. ```sh
        git checkout main
        ```
     3. ```sh
        git pull origin main
        ```
     4. ```sh
        git checkout <branch-name>
        ```
     5. ```sh
        git merge main
        ```
   - Please follow the above steps every time you start working irrespective of changes or not. It will ensure that the latest changes are present in your changes and help you fix any conflicts while merging or in the later stages.

5. **Post-Merge Notification**

   - After merging the PR, notify the developers by sending a WhatsApp Message or tag the developers in the description of the PR.
   - This informs developers about the latest activity in the repo.
   - Others can immediately review your code and test whether these changes are working or whether we need to revert.
   - **Do not delete the branches immediately. Please wait until testing and review are finished completely.**

6. **Testing Your Branch**
   - Please test your branch multiple times before merging.
   - Reverting is a tedious task that wastes a lot of time.
