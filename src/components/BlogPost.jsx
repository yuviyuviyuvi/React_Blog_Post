import React, { useState, useEffect } from 'react';

const BlogPost = () => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(124);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(progress);
      setScrollY(scrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = "The Future of Web Development: Trends and Technologies";
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareMenu(false);
    // You could add a toast notification here
  };

  const handleSubscribe = () => {
    if (!email) {
      setSubscriptionStatus('Please enter an email address');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscriptionStatus('Please enter a valid email address');
      return;
    }

    // Generate a random confirmation email
    const confirmationEmail = {
      to: email,
      subject: 'Welcome to Our Newsletter!',
      body: `Dear Subscriber,

Thank you for subscribing to our newsletter! We're excited to have you join our community of web development enthusiasts.

You'll now receive regular updates about:
- Latest web development trends
- New technologies and frameworks
- Best practices and tips
- Industry news and insights

If you have any questions or suggestions, feel free to reply to this email.

Best regards,
The Web Dev Team`
    };

    // Simulate sending the email (in a real application, this would be handled by a backend service)
    console.log('Sending confirmation email:', confirmationEmail);
    
    // Show success message
    setSubscriptionStatus('Thank you for subscribing! Please check your email for confirmation.');
    setEmail(''); // Clear the input field
  };

  return (
    <>
      {/* Bootstrap CSS */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        rel="stylesheet" 
      />

      <style>{`
        :root {
          --primary-color: #6c63ff;
          --secondary-color: #ff6b6b;
          --accent-color: #4ecdc4;
          --text-dark: #2c3e50;
          --text-light: #7f8c8d;
          --bg-light: #f8f9fa;
        }

        * {
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.7;
          color: var(--text-dark);
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        .reading-progress {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
          transform-origin: left;
          z-index: 1050;
          transition: transform 0.3s ease;
        }

        .hero-section {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
          color: white;
          padding: 80px 0 60px;
          position: relative;
          overflow: hidden;
          min-height: 60vh;
          display: flex;
          align-items: center;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          margin-right: calc(-50vw + 50%);
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="1" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="1" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.3;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .parallax-element {
          transform: translateY(${scrollY * 0.5}px);
          transition: transform 0.1s ease-out;
        }

        .article-meta {
          background: white;
          border-radius: 15px;
          padding: 25px;
          margin-top: -40px;
          position: relative;
          z-index: 3;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .author-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--primary-color);
          flex-shrink: 0;
        }

        .author-info h5 {
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }

        .author-info p {
          font-size: 0.9rem;
        }

        .author-info small {
          font-size: 0.8rem;
        }

        .article-content {
          font-size: 1.1rem;
          line-height: 1.8;
        }

        .article-content h2 {
          color: var(--primary-color);
          font-weight: 700;
          margin: 40px 0 20px;
          position: relative;
          padding-left: 20px;
          font-size: 1.8rem;
        }

        .article-content h2::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 30px;
          background: linear-gradient(to bottom, var(--primary-color), var(--accent-color));
          border-radius: 2px;
        }

        .quote-section {
          background: linear-gradient(135deg, var(--bg-light) 0%, rgba(108, 99, 255, 0.05) 100%);
          border-left: 5px solid var(--primary-color);
          padding: 25px;
          margin: 30px 0;
          border-radius: 10px;
          position: relative;
        }

        .quote-section::before {
          content: '"';
          font-size: 3rem;
          color: var(--primary-color);
          position: absolute;
          top: -5px;
          left: 15px;
          opacity: 0.3;
        }

        .floating-actions {
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .action-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: none;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .like-btn {
          background: ${isLiked ? 'var(--secondary-color)' : 'var(--text-light)'};
          transform: ${isLiked ? 'scale(1.05)' : 'scale(1)'};
        }

        .like-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
        }

        .share-btn {
          background: var(--primary-color);
          position: relative;
        }

        .share-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(108, 99, 255, 0.4);
        }

        .share-menu {
          position: absolute;
          right: 60px;
          bottom: 0;
          background: white;
          border-radius: 10px;
          padding: 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          min-width: 180px;
          opacity: ${showShareMenu ? '1' : '0'};
          visibility: ${showShareMenu ? 'visible' : 'hidden'};
          transform: ${showShareMenu ? 'translateX(0)' : 'translateX(10px)'};
          transition: all 0.3s ease;
        }

        .share-option {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          text-decoration: none;
          color: var(--text-dark);
          font-size: 0.9rem;
        }

        .share-option:hover {
          background-color: var(--bg-light);
          color: var(--text-dark);
        }

        .share-option i {
          margin-right: 8px;
          width: 16px;
        }

        .code-block {
          background: #2d3748;
          color: #e2e8f0;
          padding: 20px;
          border-radius: 10px;
          margin: 25px 0;
          position: relative;
          overflow-x: auto;
          font-size: 0.9rem;
        }

        .code-block::before {
          content: attr(data-language);
          position: absolute;
          top: 8px;
          right: 12px;
          color: #a0aec0;
          font-size: 0.75rem;
          text-transform: uppercase;
        }

        .code-block pre {
          margin: 0;
          white-space: pre;
          overflow-x: auto;
        }

        .code-block code {
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: inherit;
        }

        .highlight-box {
          background: linear-gradient(135deg, rgba(78, 205, 196, 0.1) 0%, rgba(108, 99, 255, 0.1) 100%);
          border: 1px solid rgba(78, 205, 196, 0.3);
          border-radius: 10px;
          padding: 20px;
          margin: 25px 0;
        }

        .highlight-box h5 {
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 30px 0;
        }

        .tag {
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          color: white;
          padding: 6px 14px;
          border-radius: 16px;
          font-size: 0.85rem;
          text-decoration: none;
          transition: transform 0.2s ease;
          display: inline-block;
        }

        .tag:hover {
          transform: translateY(-2px);
          color: white;
        }

        .newsletter-signup {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
          color: white;
          border-radius: 15px;
          padding: 30px;
          text-align: center;
          margin: 40px 0;
          width: 100%;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .newsletter-signup h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: white;
        }

        .newsletter-signup p {
          margin-bottom: 1.5rem;
          opacity: 0.9;
          color: white;
        }

        .newsletter-signup .input-group {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          display: flex;
          flex-wrap: nowrap;
        }

        .newsletter-signup .form-control {
          border: none;
          padding: 12px 15px;
          font-size: 1rem;
          background-color: white;
          color: var(--text-dark);
          flex: 1;
          min-width: 0;
        }

        .newsletter-signup .form-control:focus {
          box-shadow: none;
          background-color: white;
        }

        .newsletter-signup .form-control::placeholder {
          color: var(--text-light);
          opacity: 0.8;
        }

        .newsletter-signup .btn {
          padding: 12px 20px;
          font-weight: 600;
          background: var(--primary-color);
          color: white;
          border: none;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .newsletter-signup .btn:hover {
          background: var(--accent-color);
          transform: translateY(-1px);
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .hero-section {
            padding: 60px 0 40px;
            min-height: 50vh;
          }
          
          .hero-title {
            font-size: 1.8rem;
            line-height: 1.3;
          }
          
          .hero-subtitle {
            font-size: 1rem;
            margin-bottom: 1.5rem;
          }
          
          .article-meta {
            margin-top: -25px;
            padding: 20px;
          }
          
          .author-avatar {
            width: 45px;
            height: 45px;
          }
          
          .author-info h5 {
            font-size: 0.95rem;
          }
          
          .author-info p {
            font-size: 0.85rem;
          }
          
          .author-info small {
            font-size: 0.75rem;
          }
          
          .article-content {
            font-size: 1rem;
            line-height: 1.7;
          }
          
          .article-content h2 {
            font-size: 1.5rem;
            margin: 30px 0 15px;
            padding-left: 15px;
          }
          
          .article-content h2::before {
            height: 25px;
            width: 3px;
          }
          
          .quote-section {
            padding: 20px;
            margin: 25px 0;
          }
          
          .quote-section::before {
            font-size: 2.5rem;
          }
          
          .code-block {
            padding: 15px;
            font-size: 0.8rem;
            margin: 20px 0;
          }
          
          .code-block::before {
            font-size: 0.7rem;
            top: 6px;
            right: 10px;
          }
          
          .highlight-box {
            padding: 15px;
            margin: 20px 0;
          }
          
          .floating-actions {
            right: 15px;
            bottom: 15px;
          }
          
          .action-btn {
            width: 45px;
            height: 45px;
            font-size: 1rem;
          }
          
          .share-menu {
            right: 55px;
            bottom: -5px;
            min-width: 160px;
          }
          
          .newsletter-signup {
            padding: 25px 20px;
            margin: 30px 0;
            border-radius: 12px;
          }
          
          .newsletter-signup h3 {
            font-size: 1.3rem;
          }
          
          .newsletter-signup p {
            font-size: 0.95rem;
            margin-bottom: 1.25rem;
          }
          
          .newsletter-signup .input-group {
            flex-direction: row;
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            gap: 0;
          }
          
          .newsletter-signup .form-control {
            margin-bottom: 0;
            border-radius: 8px 0 0 8px;
            padding: 12px 15px;
            background-color: white;
            border: none;
            box-shadow: none;
            font-size: 1rem;
            height: auto;
            flex: 1;
            min-width: 0;
          }
          
          .newsletter-signup .btn {
            border-radius: 0 8px 8px 0;
            padding: 12px 15px;
            font-size: 1rem;
            margin-top: 0;
            white-space: nowrap;
          }
          
          .tags {
            gap: 6px;
          }
          
          .tag {
            padding: 5px 12px;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 576px) {
          .container {
            padding-left: 15px;
            padding-right: 15px;
          }
          
          .hero-section {
            padding: 50px 0 30px;
          }
          
          .hero-title {
            font-size: 1.6rem;
          }
          
          .hero-subtitle {
            font-size: 0.95rem;
          }
          
          .article-meta {
            padding: 15px;
          }
          
          .article-meta .row {
            flex-direction: column;
            gap: 15px;
          }
          
          .article-meta .col-md-4 {
            text-align: left !important;
          }
          
          .article-content h2 {
            font-size: 1.3rem;
            padding-left: 12px;
          }
          
          .code-block {
            font-size: 0.75rem;
            padding: 12px;
          }
          
          .quote-section {
            padding: 15px;
          }
          
          .quote-section .h5 {
            font-size: 1rem;
          }
          
          .floating-actions {
            right: 10px;
            bottom: 10px;
          }
          
          .action-btn {
            width: 40px;
            height: 40px;
            font-size: 0.9rem;
          }
          
          .share-menu {
            right: 50px;
            min-width: 140px;
          }
          
          .share-option {
            padding: 6px 10px;
            font-size: 0.85rem;
          }
          
          .newsletter-signup {
            padding: 20px 15px;
            margin: 25px 0;
          }
          
          .newsletter-signup h3 {
            font-size: 1.2rem;
          }
          
          .newsletter-signup p {
            font-size: 0.9rem;
            margin-bottom: 1rem;
          }
          
          .newsletter-signup .form-control {
            padding: 12px;
            font-size: 0.95rem;
          }
          
          .newsletter-signup .btn {
            padding: 12px;
            font-size: 0.95rem;
          }
        }

        @media (max-width: 400px) {
          .hero-title {
            font-size: 1.4rem;
          }
          
          .article-content {
            font-size: 0.95rem;
          }
          
          .article-content h2 {
            font-size: 1.2rem;
          }
          
          .code-block {
            font-size: 0.7rem;
          }
          
          .floating-actions {
            gap: 8px;
          }
          
          .action-btn {
            width: 38px;
            height: 38px;
            font-size: 0.85rem;
          }
        }

        .fade-in {
          animation: fadeIn 0.8s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .bounce-in {
          animation: bounceIn 0.6s ease-out;
        }

        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .parallax-element {
            transform: none !important;
          }
          
          .fade-in, .bounce-in {
            animation: none;
          }
          
          .action-btn, .tag, .share-option {
            transition: none;
          }
        }

        /* Touch-friendly improvements */
        @media (hover: none) and (pointer: coarse) {
          .action-btn {
            width: 48px;
            height: 48px;
          }
          
          .share-option {
            padding: 12px;
          }
          
          .tag {
            padding: 8px 16px;
          }
        }
      `}</style>

      {/* Reading Progress Bar */}
      <div 
        className="reading-progress" 
        style={{ transform: `scaleX(${readingProgress / 100})` }}
      ></div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="hero-content text-center fade-in">
                <div className="parallax-element">
                  <h1 className="hero-title">
                    The Future of Web Development: Trends and Technologies
                  </h1>
                  <p className="hero-subtitle">
                    Exploring the cutting-edge technologies and methodologies that are reshaping 
                    how we build and experience the web in 2024 and beyond.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Meta */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="article-meta bounce-in">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div className="d-flex align-items-center">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                      alt="Author" 
                      className="author-avatar me-3"
                    />
                    <div className="author-info">
                      <h5 className="mb-1">Alex Johnson</h5>
                      <p className="text-muted mb-0">Senior Frontend Developer</p>
                      <small className="text-muted">
                        <i className="fas fa-calendar me-1"></i> March 15, 2024
                        <span className="d-none d-sm-inline">
                          <i className="fas fa-clock ms-3 me-1"></i> 8 min read
                        </span>
                      </small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 text-md-end mt-3 mt-md-0">
                  <div className="d-flex justify-content-md-end align-items-center flex-wrap gap-2">
                    <button 
                      className={`btn btn-sm ${isLiked ? 'btn-danger' : 'btn-outline-secondary'}`}
                      onClick={handleLike}
                    >
                      <i className={`${isLiked ? 'fas' : 'far'} fa-heart me-1`}></i>
                      {likeCount}
                    </button>
                    <span className="text-muted small">
                      <i className="fas fa-eye me-1"></i> 2.4k views
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mt-4 mt-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <article className="article-content fade-in">
              <p>
                The landscape of web development is evolving at an unprecedented pace. As we navigate through 2024, 
                we're witnessing revolutionary changes in how we approach building, deploying, and maintaining web applications. 
                From the rise of AI-powered development tools to the mainstream adoption of Web3 technologies, 
                developers are equipped with more powerful tools than ever before.
              </p>

              <h2>The Rise of AI-Assisted Development</h2>
              
              <p>
                Artificial Intelligence has become a game-changer in the development workflow. Tools like GitHub Copilot, 
                ChatGPT, and specialized AI coding assistants are not just helping with code completion—they're fundamentally 
                changing how we approach problem-solving in software development.
              </p>

              <div className="highlight-box">
                <h5><i className="fas fa-lightbulb text-warning me-2"></i>Key Insight</h5>
                <p className="mb-0">
                  AI tools are most effective when used as collaborative partners rather than replacement solutions. 
                  The key is learning to ask the right questions and understanding how to validate AI-generated code.
                </p>
              </div>

              <h2>Modern JavaScript Frameworks</h2>
              
              <p>
                The JavaScript ecosystem continues to mature with frameworks like React, Vue, and Angular leading the charge. 
                However, we're also seeing the emergence of new players like Svelte and SolidJS that promise better performance 
                and developer experience.
              </p>

              <div className="code-block" data-language="javascript">
                <pre><code>{`// Modern React with Hooks and Concurrent Features
import React, { useState, useTransition } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (value) => {
    setQuery(value);
    startTransition(() => {
      // Heavy computation wrapped in transition
      setResults(performSearch(value));
    });
  };

  return (
    <div>
      <input 
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      {isPending ? <Spinner /> : <ResultsList results={results} />}
    </div>
  );
}`}</code></pre>
              </div>

              <h2>The Jamstack Revolution</h2>
              
              <p>
                Jamstack (JavaScript, APIs, and Markup) architecture has revolutionized how we think about web applications. 
                By pre-building pages and serving them from CDNs, we achieve better performance, security, and scalability. 
                Tools like Next.js, Gatsby, and Nuxt.js have made this approach mainstream.
              </p>

              <blockquote className="quote-section">
                <p className="h5 mb-3">
                  "The future of web development lies in the seamless integration of powerful frameworks, 
                  intelligent tooling, and user-centric design principles."
                </p>
                <footer className="text-muted">
                  — Sarah Chen, Lead Developer at TechCorp
                </footer>
              </blockquote>

              <h2>Web Performance Optimization</h2>
              
              <p>
                Performance remains a critical factor in user experience and SEO rankings. Modern optimization techniques include:
              </p>

              <ul className="list-unstyled">
                <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Code splitting and lazy loading</li>
                <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Image optimization with WebP and AVIF formats</li>
                <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Service workers for offline functionality</li>
                <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Critical CSS extraction and inlining</li>
                <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Progressive Web App (PWA) features</li>
              </ul>

              <h2>The Future Landscape</h2>
              
              <p>
                Looking ahead, we can expect to see continued innovation in areas like WebAssembly for high-performance applications, 
                improved browser APIs for better native integration, and the ongoing evolution of CSS with features like container queries 
                and cascade layers becoming standard.
              </p>

              <p>
                The key to staying relevant in this rapidly evolving field is maintaining a balance between exploring new technologies 
                and mastering fundamental concepts. The tools may change, but the principles of good software development remain constant.
              </p>

              {/* Tags */}
              <div className="tags">
                <a href="#" className="tag">Web Development</a>
                <a href="#" className="tag">JavaScript</a>
                <a href="#" className="tag">React</a>
                <a href="#" className="tag">Performance</a>
                <a href="#" className="tag">AI</a>
                <a href="#" className="tag">Jamstack</a>
              </div>

              {/* Newsletter Signup */}
              <div className="newsletter-signup">
                <h3 className="mb-3">Stay Updated</h3>
                <p className="mb-4">Get the latest insights on web development trends delivered to your inbox.</p>
                <div className="row justify-content-center">
                  <div className="col-12 col-md-8">
                    <div className="input-group">
                      <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <button 
                        className="btn btn-light" 
                        type="button"
                        onClick={handleSubscribe}
                      >
                        Subscribe <i className="fas fa-arrow-right ms-1"></i>
                      </button>
                    </div>
                    {subscriptionStatus && (
                      <div className={`mt-3 text-center ${subscriptionStatus.includes('Thank you') ? 'text-success' : 'text-danger'}`}>
                        {subscriptionStatus}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Floating Actions */}
      <div className="floating-actions">
        <button 
          className="action-btn like-btn"
          onClick={handleLike}
          title={`${isLiked ? 'Unlike' : 'Like'} this post`}
        >
          <i className={`${isLiked ? 'fas' : 'far'} fa-heart`}></i>
        </button>
        <div style={{ position: 'relative' }}>
          <button 
            className="action-btn share-btn"
            onClick={() => setShowShareMenu(!showShareMenu)}
            title="Share this post"
          >
            <i className="fas fa-share"></i>
          </button>
          <div className="share-menu">
            <div className="share-option" onClick={() => handleShare('twitter')}>
              <i className="fab fa-twitter" style={{ color: '#1da1f2' }}></i>
              Twitter
            </div>
            <div className="share-option" onClick={() => handleShare('facebook')}>
              <i className="fab fa-facebook" style={{ color: '#4267b2' }}></i>
              Facebook
            </div>
            <div className="share-option" onClick={() => handleShare('linkedin')}>
              <i className="fab fa-linkedin" style={{ color: '#0077b5' }}></i>
              LinkedIn
            </div>
            <div className="share-option" onClick={copyToClipboard}>
              <i className="fas fa-link" style={{ color: '#6c63ff' }}></i>
              Copy Link
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap JS */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    </>
  );
};

export default BlogPost;