---

# Bill Parser App

## Overview

This project is a web application that allows users to upload a photo of a bill, and automatically parses the information using OCR (Tesseract.js) and an LLaMA model. The extracted data is then structured into JSON format and stored in a PostgreSQL database.

## Features

- **OCR with Tesseract.js:** Extracts text, rows, and columns from uploaded bill images.
- **LLaMA Model Integration:** Converts the OCR output into structured JSON format.
- **Database Storage:** Saves parsed data into a PostgreSQL database for future reference.
- **User-Friendly Interface:** Allows users to easily upload and process bills through a web interface built with Next.js.

## Tech Stack

- **NestJS** - Backend framework for building efficient, scalable Node.js server-side applications.
- **TypeScript** - Typed superset of JavaScript that compiles to plain JavaScript.
- **Next.js** - React framework for server-rendered or statically-exported React apps.
- **PostgreSQL** - Open-source relational database management system.

## System Architecture

### 1. User Uploads a Bill Image

The user uploads a bill image via the front-end interface built with Next.js. The image is then sent to the backend server built with NestJS.

### 2. OCR Processing

The uploaded image is processed by Tesseract.js, an OCR library that extracts the text, rows, and columns from the bill.

### 3. LLaMA Model Parsing

The extracted data from the OCR process is passed to a LLaMA model, which converts the unstructured text into a structured JSON format.

### 4. Data Storage

The resulting JSON is stored in a PostgreSQL database, allowing for easy retrieval and analysis in the future.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL (v12 or later)
- Tesseract.js
- LLaMA Model (pre-trained)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/bill-parser-app.git
   cd bill-parser-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**
   - Ensure PostgreSQL is installed and running.
   - Create a database and configure your `.env` file with the database credentials.

4. **Run the application:**
   ```bash
   npm run dev
   ```

### Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Upload an image of a bill.
3. The system will process the image and display the extracted data in JSON format.
4. The JSON data is saved to the database for future use.

## Contributing

We welcome contributions! Please follow our guidelines for contributing and make sure to run tests before submitting a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any inquiries, please reach out to `mustafatrunkwala8@gmail.com`.

---
