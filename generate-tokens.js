const StyleDictionary = require("style-dictionary");

const generateTokens = ({ sourceGlob, buildPath, destination }) => {
  const builder = StyleDictionary.extend({
    source: [sourceGlob],
    platforms: {
      js: {
        transformGroup: "js",
        transforms: ["name/cti/pascal"],
        buildPath: buildPath || "lib/theme/build/js/",
        files: [
          {
            destination: destination,
            format: "javascript/es6",
          },
        ],
      },
    },
  });

  builder.buildAllPlatforms();
};

generateTokens({
  sourceGlob: ["ds-tokens/*.json"],
  destination: "tokens.js",
});
