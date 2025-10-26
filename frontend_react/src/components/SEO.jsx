import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Fashion Cloth Website", 
  description = "Discover the latest fashion trends and clothing collections", 
  keywords = "fashion, clothing, apparel, trends, style",
  author = "Fashion Cloth Website",
  image = "",
  url = ""
}) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      
      {/* Additional metadata */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url || window.location.href} />
    </Helmet>
  );
};

export default SEO;