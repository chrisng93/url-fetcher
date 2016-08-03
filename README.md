# URL Fetcher

URL fetcher with a job queue. Workers fetch the HTML from the queue and insert it into the database.

## Usage

This service takes 'POST' requests at '/api/urls/submit' and 'GET' requests at '/api/urls/status'

Requests to '/api/urls/submit' should include the following:
  ```sh
  url (in form of "www.website.domain")
  ```

Requests to '/api/urls/status' should include the following:
  ```sh
  job_id (received from 'POST' requests to '/api/urls/submit')
  ```

## Getting Started

#### 1. Clone the latest version

  Start by cloning the latest version of the URL Fetcher on your local machine by running:

  ```sh
  $ git clone https://github.com/chrisng93/url-fetcher.git
  $ cd url-fetcher
  ```

#### 2. Install Dependencies
  From within the root directory, run the following command to install all dependencies:

  ```sh
  $ npm install
  ```

#### 3. Run MongoDB
  From your terminal, run the following command to run MongoDB:

  ```sh
  $ mongod
  ```

#### 4. Run the application

  1. In a new terminal window run the following command to start the application:

  ```sh
  $ npm start
  ```

  After that open in your browser the localhost with your chosen port, e.g. ``` http://localhost:8000/ ``` to access the application.
