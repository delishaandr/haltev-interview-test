module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define("article", {
    sourceid: {
      type: Sequelize.STRING
    },
    sourcename: {
      type: Sequelize.STRING
    },
    author: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    url: {
      type: Sequelize.STRING(500)
    },
    urlToImage: {
      type: Sequelize.STRING
    },
    publishedAt: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.STRING
    },
  });

  return Article;
};