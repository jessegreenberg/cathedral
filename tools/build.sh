#!/bin/bash
# This script bundles all project files and assets into a single runnable HTML file.

# Step 1: Base64 encode the font file
FONT_ENCODED=$(base64 -w 0 ../fonts/DotGothic16-Regular.ttf)

# Step 2: Start constructing the HTML content
HTML_CONTENT="<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <title>Cathedral</title>

  <style media='screen, print'>
    @font-face {
      font-family: 'DotGothic';
      src: url(data:font/truetype;charset=utf-8;base64,$FONT_ENCODED) format('truetype');
    }
  </style>"

# Step 3: Insert the JavaScript contents into the HTML
JS_FILES=("../js/lib/phet-lib.min.js" "../js/lib/phet-forwarding.js")

for js_file in "${JS_FILES[@]}"; do
    JS_CONTENT=$(<"$js_file")
    HTML_CONTENT+="<script>$JS_CONTENT</script>"
done

# Handle the module script separately
BUNDLE_JS="../dist-webpack/bundle.js"
BUNDLE_CONTENT=$(<"$BUNDLE_JS")
HTML_CONTENT+="<script type='module'>$BUNDLE_CONTENT</script>"

# Close the HTML tags
HTML_CONTENT+="</head>
<body>
<!-- Your body content here -->
</body>
</html>"

# Step 4: Save the result to a new HTML file in the build directory
echo "$HTML_CONTENT" > ../build/index.html

echo "Build completed! Check the cathedral.html file."
