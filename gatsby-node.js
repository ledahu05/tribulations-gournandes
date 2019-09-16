const path = require("path");
const _ = require("lodash");

const moment = require("moment");
const siteConfig = require("./data/SiteConfig");
const postNodes = [];

function grep(obj, str) {
  if (JSON.stringify(obj).includes(str)) {
    // console.log(obj);
  }
}

function addSiblingNodes(createNodeField) {
  // console.log(postNodes, "addSiblingNodes");
  postNodes.sort(({ publication: date1 }, { publication: date2 }) => {
    const dateA = moment(date1, siteConfig.dateFromFormat);
    const dateB = moment(date2, siteConfig.dateFromFormat);

    if (dateA.isBefore(dateB)) return 1;

    if (dateB.isBefore(dateA)) return -1;

    return 0;
  });
  // console.log(postNodes, "addSiblingNodes");

  for (let i = 0; i < postNodes.length; i += 1) {
    const nextID = i + 1 < postNodes.length ? i + 1 : 0;
    const prevID = i - 1 > 0 ? i - 1 : postNodes.length - 1;
    const currNode = postNodes[i];
    const nextNode = postNodes[nextID];
    const prevNode = postNodes[prevID];
    // console.log(nextNode.nom, '------------ nextTitle, createNodeField1');
    // console.log(nextNode.fields.slug, '------------ nextSlug, createNodeField2');
    // console.log(prevNode.nom, '------------ prevTitle, createNodeField3');
    // console.log(prevNode.fields.slug, '------------ prevSlug, createNodeField4');
    createNodeField({
      node: currNode,
      name: "nextTitle",
      value: nextNode.nom
    });
    createNodeField({
      node: currNode,
      name: "nextSlug",
      value: nextNode.fields.slug
    });
    createNodeField({
      node: currNode,
      name: "prevTitle",
      value: prevNode.nom
    });
    createNodeField({
      node: currNode,
      name: "prevSlug",
      value: prevNode.fields.slug
    });
    console.log(currNode, 'currNode')
    // console.log('---------------------------------------- DONE ---------------------------------------------')
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // grep(node, 'publication');
  if (node.internal.type === "ContentfulPost") {
    // console.log(node);
    const { slug } = node;
    const { publication } = node;
    const date = moment(publication, siteConfig.dateFromFormat);
    // console.log(slug, publication, date);
    createNodeField({
      node,
      name: "date",
      value: date.toISOString()
    });
    createNodeField({ node, name: "slug", value: slug });
    createNodeField({ node, name: "nextTitle", value: slug });
    createNodeField({ node, name: "nextSlug", value: slug });
    createNodeField({ node, name: "prevTitle", value: slug });
    createNodeField({ node, name: "prevSlug", value: slug });
    postNodes.push(node);
  }
};

exports.setFieldsOnGraphQLNodeType = ({ type, actions }) => {
  const { name } = type;
  const { createNodeField } = actions;
  if (name === "ContentfulPost") {
    addSiblingNodes(createNodeField);
  }
  // console.log(postNodes, "setFieldsOnGraphQLNodeType");
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postPage = path.resolve("src/templates/post.jsx");
    const tagPage = path.resolve("src/templates/tag.jsx");
    const categoryPage = path.resolve("src/templates/category.jsx");
    resolve(
      graphql(
        `
          {
            post: allContentfulPost {
              edges {
                node {
                  slug
                  tags
                  category
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          /* eslint no-console: "off" */
          reject(result.errors);
        }
        const tagSet = new Set();
        const categorySet = new Set();
        result.data.post.edges.forEach(edge => {
          if (edge.node.tags) {
            edge.node.tags.forEach(tag => {
              tagSet.add(tag);
            });
          }

          if (edge.node.category) {
            categorySet.add(edge.node.category);
          }
          createPage({
            path: edge.node.slug,
            component: postPage,
            context: {
              slug: edge.node.slug
            }
          });
        });

        const tagList = Array.from(tagSet);
        tagList.forEach(tag => {
          createPage({
            path: `/tags/${_.kebabCase(tag)}/`,
            component: tagPage,
            context: {
              tag
            }
          });
        });

        const categoryList = Array.from(categorySet);
        categoryList.forEach(category => {
          createPage({
            path: `/categories/${_.kebabCase(category)}/`,
            component: categoryPage,
            context: {
              category
            }
          });
        });
      })
    );
  });
};
