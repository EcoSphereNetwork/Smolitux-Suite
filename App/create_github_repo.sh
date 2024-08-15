#!/bin/bash

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null
then
    echo "GitHub CLI (gh) could not be found. Please install it and authenticate using 'gh auth login'."
    exit
fi

# Check if a git repository already exists
if [ -d ".git" ]; then
    echo "A Git repository already exists in this directory."
else
    # Initialize a new git repository
    git init
    echo "Initialized a new Git repository."
fi

# Add all files to the repository
git add .

# Commit the files
read -p "Enter the commit message: " commit_message
git commit -m "$commit_message"

# Get the current directory name as the repository name
repo_name=${PWD##*/}

# Create a private repository on GitHub
gh repo create "$repo_name" --private --source=. --remote=origin --push

# Push the files to GitHub
git push -u origin main

echo "Repository has been created and pushed to GitHub as a private repository."
