#!/bin/bash

# Define the directory you want to traverse
PROJECT_DIR="."

# Function to print project structure
print_structure() {
  echo "Project structure for directory: $PROJECT_DIR"

  # Use 'find' to list files and directories, excluding node_modules, android, ios, build, vendor, and .git directories
  find $PROJECT_DIR \
    -path "$PROJECT_DIR/node_modules" -prune -o \
    -path "$PROJECT_DIR/android" -prune -o \
    -path "$PROJECT_DIR/ios" -prune -o \
    -path "$PROJECT_DIR/build" -prune -o \
    -path "$PROJECT_DIR/vendor" -prune -o \
    -path "$PROJECT_DIR/.git" -prune -o \
    -print | sed -e "s|[^/]*/|   |g" -e "s|/[^/]*$|-- &|"
}

# Call the function
print_structure