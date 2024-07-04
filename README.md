# Vivi Fun

Vivi Fun is a delightful website featuring a variety of games designed for children. Our goal is to provide fun and educational activities that keep kids entertained. New games will be added over time to expand the collection.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Vivi Fun is a platform where children can play a variety of games. The site is designed to be visually appealing and easy to navigate for young users. The first two games available are:

1. **Memory Game**: A classic game where players flip cards to find matching pairs.
2. **Bubble Pop Game**: An interactive game where players pop bubbles that appear on the screen.

The site is deployed on Vercel and can be accessed at [www.vivifun.com](https://www.vivifun.com).

## Features

- **Memory Game**: Match pairs of cards to win.
- **Bubble Pop Game**: Pop colorful bubbles for fun animations and points.
- Regular updates with new games.
- Child-friendly design and interface.

## Demo

Check out the live demo of Vivi Fun [here](https://www.vivifun.com).

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**

   ```sh
   git clone https://github.com/your-username/vivi-fun.git
   cd vivi-fun
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.development.local` file in the root of the project with the following content:

   ```plaintext
   # AWS S3
   AWS_ACCESS_KEY_ID=
   AWS_SECRET_ACCESS_KEY=
   AWS_REGION=
   AWS_BUCKET_NAME=
   ```

   Replace the placeholders with your actual AWS credentials and bucket information.

## Usage

To start the development server and play the game locally, run:

```sh
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to see the Vivi Fun website in action.

## Deployment

Vivi Fun is deployed on Vercel. To deploy your own version:

1. **Push your changes to a GitHub repository.**
2. **Sign in to [Vercel](https://vercel.com/) and create a new project.**
3. **Connect your GitHub repository to Vercel.**
4. **Set up your environment variables in the Vercel dashboard.**
5. **Deploy the project.**

## Technologies Used

- **Next.js**: A React framework for server-rendered applications.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **React Icons**: Popular icons as React components.
- **canvas-confetti**: Confetti animations using the canvas element.
- **AWS S3**: For storing and accessing game assets.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
