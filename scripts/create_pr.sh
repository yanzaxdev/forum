#!/bin/bash

# Ensure GitHub CLI is installed
if ! command -v gh &> /dev/null
then
    echo "GitHub CLI (gh) could not be found. Please install it first."
    exit 1
fi

# Get the current branch
current_branch=$(git branch --show-current)

# Ask for the base branch
read -p "Enter the base branch (default: main): " base_branch
base_branch=${base_branch:-main}

# Ask for the head branch
read -p "Enter the head branch (default: $current_branch): " head_branch
head_branch=${head_branch:-$current_branch}

# Ask for the pull request title
read -p "Enter the pull request title: " pr_title

# Ask for the pull request description
read -p "Enter the pull request description: " pr_body

# Create the pull request
gh pr create --base "$base_branch" --head "$head_branch" --title "$pr_title" --body "$pr_body"

echo "Pull request created successfully!"