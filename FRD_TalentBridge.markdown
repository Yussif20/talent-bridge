# Functional Requirements Document (FRD) for Talent Bridge Web App

## Project Overview

**App Name**: TalentBridge
**Purpose**: A web application to screen for twice-exceptional students (gifted students with disabilities) by allowing teachers and parents to fill out behavioral characteristic forms, instantly displaying results based on scores, generating a 4-week individualized plan, and enabling PDF downloads and email delivery of results.
**Timeline**: 5 days (by September 30, 2025).
**Target Users**: Teachers and parents of students, with potential admin access for coordinators.
**Objective**: Provide an intuitive, user-friendly interface to digitize paper-based forms, calculate scores, present results, and generate actionable plans without requiring a backend server.

## Functional Requirements

### 1. General Requirements

- **Platform**: Web application, responsive for mobile and desktop.
- **Technologies**:
  - **Framework**: Next.js (v14 or latest) for client-side rendering and static site generation.
  - **Styling**: Tailwind CSS for responsive, clean, and modern UI.
  - **PDF Generation**: jsPDF for client-side PDF creation.
  - **Email Delivery**: Email.js for sending results via email without a backend.
  - **Deployment**: Vercel for free, fast hosting.
- **Language**: Arabic (primary), with optional English subheadings for reports.
- **Accessibility**: Ensure forms and results are WCAG 2.1 compliant (e.g., high-contrast text, keyboard navigation).
- **No Backend**: All calculations and data processing occur client-side to simplify development and meet the 5-day timeline.

### 2. Landing Page

- **Purpose**: Educate users about twice-exceptional students and guide them to forms.
- **Features**:
  - Display a brief introduction (3-4 paragraphs) about twice-exceptional students (e.g., giftedness with autism, learning disabilities, etc.).
  - Two prominent buttons: "Teacher Form" and "Parent Form".
  - Optional: Logo placeholder (if provided by client) and customizable color scheme (default: blue/white palette).
  - Responsive design with Tailwind CSS (mobile-first, clean layout).
- **Content Example**:
  - Header: "Welcome to TalentBridge: Supporting Twice-Exceptional Students"
  - Text: Brief explanation of giftedness, disabilities (autism, ADHD, etc.), and the app's purpose.
  - Call-to-Action: Buttons linking to `/teacher-form` and `/parent-form` routes.
- **Route**: `/` (home page).

### 3. Teacher Form

- **Purpose**: Digitize the "Teacher Behavioral Characteristics Form" (70 questions across 8 sections).
- **Features**:
  - Sections: General, Autism, Learning Disabilities, Hearing Impairment, Visual Impairment, Intellectual Disability, ADHD, Multiple Disabilities.
  - Questions: 10 per section (total ~70), each with a Likert scale (Never = 0, Sometimes = 1, Always = 2).
  - Fields: Student Name, Student ID (unique identifier), Teacher Email.
  - Interactive UI: Use Formik for form management, display questions in collapsible sections or step-by-step wizard to reduce overwhelm.
  - Validation: Ensure all required fields are filled before submission.
  - Route: `/teacher-form`.
- **Data Structure**:
  ```json
  {
    "studentName": "string",
    "studentId": "string",
    "email": "string",
    "responses": {
      "general": [{ "q1": 0-2 }, { "q2": 0-2 }, ...],
      "autism": [{ "q1": 0-2 }, ...],
      ...
    }
  }
  ```

### 4. Parent Form

- **Purpose**: Digitize the "Parent Behavioral Characteristics Form" (15 questions).
- **Features**:
  - Questions: 15 general behavioral questions, Likert scale (Never = 0, Sometimes = 1, Always = 2).
  - Fields: Student Name, Student ID, Parent Email.
  - UI: Simple, single-page form with Formik, progress bar for completion.
  - Validation: Required fields, valid email format.
  - Route: `/parent-form`.
- **Data Structure**: Similar to Teacher Form, but with a single "general" section (15 questions).

### 5. Score Calculation Logic

- **Purpose**: Calculate scores client-side to determine giftedness and disability levels.
- **Logic** (adjustable based on client feedback):
  - Each question: 0 (Never), 1 (Sometimes), 2 (Always).
  - Domain Score: Average of question scores in a domain × 25 (to scale to 0-100).
  - Giftedness Score: Average of domains related to giftedness (e.g., General, Creativity, Reasoning).
  - Disability Score: Average of domains related to disabilities (e.g., Autism, Learning Disabilities).
  - Classification:
    - 0-39: Low
    - 40-59: Moderate
    - 60-74: High
    - 75-100: Very High
  - Alerts: If Giftedness ≥ 60 and Disability ≥ 50, flag as "Suspected Twice-Exceptional (2e)".
  - Strengths: Top 3 domains by score.
  - Challenges: Bottom 3 domains by score.
- **Output**: JSON object with scores, classification, strengths, challenges, and support areas.

### 6. Results Page

- **Purpose**: Display immediate results after form submission.
- **Features**:
  - Display: Giftedness Score (e.g., "75/100 - Very High"), Disability Score (e.g., "50/100 - Moderate"), Strengths (e.g., "Creativity, Reasoning"), Challenges (e.g., "Attention, Organization"), Support Areas (e.g., "Needs visual routines").
  - Visualization: Simple bar chart or list using Chart.js or Tailwind-styled components.
  - Button: "Download PDF" to trigger PDF generation.
  - Email Field: Input for user to enter email for result delivery.
  - Route: `/results` (dynamic based on form data).
- **UI**: Clean, card-based layout with Tailwind CSS, Arabic text (RTL), optional English subheadings.

### 7. Individualized 4-Week Plan

- **Purpose**: Generate a tailored 4-week plan based on results.
- **Structure**:
  - **Page 1 (Summary)**: Giftedness/Disability scores, strengths, challenges, 2e flag.
  - **Page 2 (Goals)**: 2-3 SMART goals (e.g., "Increase focus from 5 to 10 minutes in 4 weeks").
  - **Pages 3-4 (Weekly Plan)**:
    - Columns: Week, Goal, Activities, Family Role, Evidence, Responsible, Outcome.
    - Example:
      - Week 1: "Improve attention" | Goal: "Focus for 5 min" | Activities: "Visual timer, task breakdown" | Family Role: "10 min daily practice" | Evidence: "Checklist" | Responsible: "Teacher/Parent" | Outcome: "In Progress".
  - Strategy Library: JSON object (client-side) with interventions (e.g., Autism: "Visual routine"; Learning Disability: "Writing templates"). Use provided CSV from Copilot or create new based on forms.
- **Implementation**: Generate plan as HTML, convert to PDF with jsPDF.

### 8. PDF Generation

- **Purpose**: Allow users to download results and plan as a PDF.
- **Features**:
  - Content: Results summary + 4-week plan.
  - Format: Arabic (RTL), optional English subheadings, clean layout with tables.
  - Library: jsPDF with autoTable plugin for structured output.
  - Button: "Download PDF" on results page.
- **Output**: A4-sized PDF, downloadable client-side.

### 9. Email Delivery

- **Purpose**: Send results and plan link to user’s email.
- **Features**:
  - Library: Email.js for client-side email sending.
  - Email Content:
    ```
    Subject: TalentBridge Results for [Student Name]
    Body:
    Dear [Teacher/Parent],
    Thank you for completing the form. Results for [Student Name]:
    - Giftedness: [Score]/100 ([Level])
    - Disability: [Score]/100 ([Level])
    - Strengths: [List]
    - Challenges: [List]
    - Plan: [PDF Link or Attachment]
    Note: For educational purposes, not a medical diagnosis.
    ```
  - Trigger: After entering email on results page, send via Email.js.
- **Security**: Use Email.js secure token, no data storage.

### 10. Security and Privacy

- **Requirements**:
  - No backend storage; all data processed client-side.
  - Email.js uses secure API for email delivery.
  - Optional: Add temporary link or one-time code for results access (if client requests).
- **Goal**: Protect sensitive student data.

## Development Phases

### Phase 1: Setup and Landing Page (Day 1-2)

- **Tasks**:
  - Initialize Next.js project (`npx create-next-app`).
  - Install Tailwind CSS and configure for RTL Arabic support.
  - Build landing page: static content, buttons to `/teacher-form` and `/parent-form`.
  - Design: Mobile-first, clean layout, blue/white palette (or client’s colors).
- **Deliverable**: Deployed landing page on Vercel.

### Phase 2: Forms and Validation (Day 2-3)

- **Tasks**:
  - Create teacher form (70 questions, 8 sections) and parent form (15 questions) using Formik.
  - Implement Likert scale (radio buttons: 0-2).
  - Add validation for required fields (Student Name, ID, Email).
  - Style with Tailwind CSS (collapsible sections or wizard for teacher form).
- **Deliverable**: Functional forms with validation.

### Phase 3: Score Calculation and Results (Day 3-4)

- **Tasks**:
  - Implement client-side score calculation (per domain, giftedness, disability).
  - Build results page: display scores, strengths, challenges, support areas.
  - Add simple visualization (Chart.js or Tailwind-styled bars).
  - Test with 5 dummy responses.
- **Deliverable**: Results page with accurate calculations.

### Phase 4: Plan, PDF, and Email (Day 4-5)

- **Tasks**:
  - Create strategy library (JSON) for 4-week plan generation.
  - Generate plan: summary, SMART goals, weekly table.
  - Implement PDF download with jsPDF (A4, Arabic RTL).
  - Integrate Email.js for sending results (configure API token).
- **Deliverable**: PDF download and email functionality.

### Phase 5: Testing and Deployment (Day 5)

- **Tasks**:
  - Test end-to-end: form submission → results → PDF → email.
  - Fix bugs, optimize performance.
  - Deploy final version on Vercel.
  - Provide client with URL and usage instructions.
- **Deliverable**: Fully functional app, tested with dummy data.

## Non-Functional Requirements

- **Performance**: Page load time < 2 seconds (Next.js static optimization).
- **Scalability**: Support up to 100 concurrent users (Vercel free tier).
- **Usability**: Intuitive UI, Arabic RTL, 5-minute form completion.
- **Security**: No data storage, secure email delivery.
- **Maintenance**: Modular code for easy updates (e.g., adding new strategies).

## Assumptions

- Client provides logo/colors (optional) or defaults used.
- Strategy library based on provided CSV or derived from forms.
- Score calculation logic is preliminary; client may adjust thresholds.
- No admin dashboard unless requested later.
- Email.js free tier sufficient for initial use.

## Dependencies

- **Next.js**: `npm install next@latest`
- **Tailwind CSS**: `npm install tailwindcss@latest postcss autoprefixer`
- **Formik**: `npm install formik`
- **jsPDF**: `npm install jspdf jspdf-autotable`
- **Email.js**: `npm install @emailjs/browser`
- **Chart.js (optional)**: `npm install chart.js react-chartjs-2` for visualizations.

## Deliverables

- Deployed web app on Vercel (URL provided).
- Source code in GitHub repository (if requested).
- Test results for 5 dummy cases.
- Usage guide (short markdown doc or video).

## Cost and Timeline

- **Timeline**: 5 days (September 25-30, 2025).
- **Effort**: 25-30 hours.
- **Cost**: $2/hour (total $50-60), discounted due to project’s educational purpose.

## Next Steps

- Confirm client preferences: logo, colors, score calculation details, strategy library.
- Provide 5-10 dummy responses for testing.
- Start development on September 26, 2025, with daily updates.

**Prepared by**: [Your Name]
**Date**: September 25, 2025
