#!/bin/bash

# Set target directory and output file
TARGET_DIR="../images"
OUTPUT_FILE="../js/ModulifiedImageMap.ts"

# Clear or create the output file
> $OUTPUT_FILE

# Write the start of the TS constant to the output file
echo "const ModulifiedImageMap = {" >> $OUTPUT_FILE

# Iterate over all images in the target directory
find "$TARGET_DIR" -type f \( -iname \*.jpg -o -iname \*.png -o -iname \*.jpeg -o -iname \*.gif \) | while read -r img; do

    # Extract the relative path, relative to images
    REL_PATH="images/${img#"$TARGET_DIR/"}"

    # Extract the image name without the path
    IMG_NAME=$(basename "$img")
    # Convert image name to CamelCase
    IMG_NAME_CC=$(echo "$IMG_NAME" | sed -r 's/(^|-|_)([a-z])/\U\2/g')

    # Construct the final key, with path and image name
    FINAL_NAME="'./$REL_PATH'"

    # Base64 encode the image
    ENCODED_IMG=$(base64 -w 0 "$img")

    FILE_TYPE=$(file --mime-type -b "$img")

    # Determine the MIME type of the image
    if [[ "$FILE_TYPE" == "image/jpeg" ]]; then
        MIME_TYPE="image/jpeg"
    elif [[ "$FILE_TYPE" == "image/png" ]]; then
        MIME_TYPE="image/png"
    else
        echo "Unsupported file type for $img"
        continue
    fi

    # Append the image name and encoded data to the output file
    echo "  $FINAL_NAME: 'data:image/jpeg;base64,$ENCODED_IMG'," >> $OUTPUT_FILE
done

# Close the TS constant in the output file
echo "};" >> $OUTPUT_FILE
echo "export default ModulifiedImageMap;" >> $OUTPUT_FILE

echo "Images have been modulified in $OUTPUT_FILE"