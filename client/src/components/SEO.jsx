import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, noindex = false }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {noindex && (
        <meta name="robots" content="noindex, nofollow" />
      )}
    </Helmet>
  );
};

export default SEO;