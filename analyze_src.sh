#!/bin/bash

# Define the src folder path (you can change this if needed)
SRC_DIR="src"

# Check if the src directory exists
if [ ! -d "$SRC_DIR" ]; then
  echo "Error: $SRC_DIR directory does not exist."
  exit 1
fi

# Function to list files in the src directory
function list_files() {
  local DIR=$1
  echo "Analyzing directory: $DIR"

  # Recursively list all files and directories inside the src directory
  find "$DIR" -type f | while read -r file; do
    echo "$file"
  done
}

# Execute the function to list files in src
list_files "$SRC_DIR"

echo "Analysis of src folder completed."