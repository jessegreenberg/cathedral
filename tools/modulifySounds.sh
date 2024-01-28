#!/bin/bash

# Set target directory and output file
TARGET_DIR="../sounds"
OUTPUT_FILE="../js/ModulifiedSoundMap.ts"

# Clear or create the output file
> $OUTPUT_FILE

# Write the start of the TS constant to the output file
echo "const ModulifiedSoundMap = {" >> $OUTPUT_FILE

# Iterate over all sound files in the target directory
find "$TARGET_DIR" -type f \( -iname \*.mp3 -o -iname \*.wav -o -iname \*.ogg \) | while read -r sound; do

    # Extract the relative path, relative to sounds
    REL_PATH="sounds/${sound#"$TARGET_DIR/"}"

    # Extract the sound file name without the path
    SOUND_NAME=$(basename "$sound")
    # Convert sound name to CamelCase
    SOUND_NAME_CC=$(echo "$SOUND_NAME" | sed -r 's/(^|-|_)([a-z])/\U\2/g')

    # Construct the final key, with path and sound name
    FINAL_NAME="'./$REL_PATH'"

    # Base64 encode the sound
    ENCODED_SOUND=$(base64 -w 0 "$sound")

    FILE_TYPE=$(file --mime-type -b "$sound")

    # Determine the MIME type of the sound
    if [[ "$FILE_TYPE" == "audio/mpeg" ]]; then
        MIME_TYPE="audio/mpeg"
    elif [[ "$FILE_TYPE" == "audio/wav" ]]; then
        MIME_TYPE="audio/wav"
    elif [[ "$FILE_TYPE" == "audio/ogg" ]]; then
        MIME_TYPE="audio/ogg"
    else
        echo "Unsupported file type for $sound"
        continue
    fi

    # Append the sound name and encoded data to the output file
    echo "  $FINAL_NAME: 'data:$MIME_TYPE;base64,$ENCODED_SOUND'," >> $OUTPUT_FILE
done

# Close the TS constant in the output file
echo "};" >> $OUTPUT_FILE
echo "export default ModulifiedSoundMap;" >> $OUTPUT_FILE

echo "Sounds have been modulified in $OUTPUT_FILE"