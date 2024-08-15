#!/bin/bash

# Script to delete the Git repository from the current directory without removing any project files.

# Check if the .git directory exists
if [ -d ".git" ]; then
    # Prompt the user for confirmation
    read -p "Are you sure you want to delete the Git repository in $(pwd)? This action cannot be undone. (y/n): " confirm
    case "$confirm" in
        [yY][eE][sS]|[yY])
            rm -rf .git
            echo "Git repository has been successfully removed from the current directory."
            ;;
        *)
            echo "Operation canceled by the user."
            ;;
    esac
else
    echo "No Git repository found in the current directory."
fi
