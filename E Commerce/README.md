# StudentBuy - Affiliate E-Commerce Platform for Indian Students

StudentBuy is a comprehensive e-commerce platform focused on affiliate marketing of products appealing to Indian students. The platform allows students to find the best deals across multiple Indian marketplaces (Amazon, Flipkart, Myntra) and provides a seamless shopping experience.

## Features

- **Product Comparison**: Compare prices across multiple e-commerce platforms
- **Student-Focused Categories**: Electronics, Fashion, Stationery, Gadgets, Books
- **Responsive Design**: Mobile-first approach for seamless experience across all devices
- **Affiliate Integration**: Direct links to the best deals on trusted platforms
- **Student Stories**: Testimonials from fellow students sharing their experiences
- **Campus Ambassador Program**: Earn by referring friends and promoting products

## Technology Stack

- **Frontend**: React.js with Next.js framework
- **Styling**: TailwindCSS for modern, responsive design
- **Database**: MongoDB for product and user data storage
- **Authentication**: NextAuth.js for secure user authentication
- **State Management**: React Context API
- **APIs**: Integration with multiple e-commerce affiliate programs

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn
- MongoDB (local or Atlas connection)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/studentbuy.git
   cd studentbuy
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

```
/app
  /components     # Reusable UI components
  /context        # React Context for state management
  /hooks          # Custom React hooks
  /models         # MongoDB schemas
  /pages          # Next.js pages and API routes
  /public         # Static assets
  /services       # External API integrations
  /styles         # Global styles and Tailwind config
  /utils          # Utility functions and helpers
```

## Deployment

The application can be deployed on platforms like Vercel or Netlify with minimal configuration:

```bash
# Build the project
npm run build
# or
yarn build

# Start the production server
npm start
# or
yarn start
```

## Contributing

We welcome contributions from the community! Please read our contributing guidelines to get started.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries or support, please contact us at:
- Email: support@studentbuy.in
- Twitter: [@StudentBuyIndia](https://twitter.com/StudentBuyIndia)

---

Built with ❤️ for Indian students 