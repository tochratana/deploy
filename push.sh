#!/bin/bash

# NextApp Auto-Push Script
# This script automates git commits and pushes to the remote repository

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
REPO_URL="https://github.com/tochratana/deploy.git"
REMOTE_NAME="origin"
BRANCH="main"

# Functions
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if git is initialized
if [ ! -d .git ]; then
    print_info "Initializing git repository..."
    git init
    print_success "Git repository initialized"
fi

# Check if remote exists
if ! git remote get-url $REMOTE_NAME > /dev/null 2>&1; then
    print_info "Adding remote origin: $REPO_URL"
    git remote add $REMOTE_NAME "$REPO_URL"
    print_success "Remote added"
else
    print_info "Remote already configured"
    CURRENT_URL=$(git remote get-url $REMOTE_NAME)
    print_info "Current remote: $CURRENT_URL"
fi

# Get commit message
COMMIT_MESSAGE="${1:-Update: $(date +'%Y-%m-%d %H:%M:%S')}"

# Check for uncommitted changes
if [ -z "$(git status --porcelain)" ]; then
    print_warning "No changes to commit"
    exit 0
fi

# Show status
print_info "Current status:"
git status --short

# Add all changes
print_info "Staging all changes..."
git add -A
print_success "Changes staged"

# Commit changes
print_info "Committing changes..."
git commit -m "$COMMIT_MESSAGE"
print_success "Changes committed: $COMMIT_MESSAGE"

# Push to remote
print_info "Pushing to $REMOTE_NAME/$BRANCH..."
git push -u $REMOTE_NAME $BRANCH

if [ $? -eq 0 ]; then
    print_success "Successfully pushed to $REPO_URL"
    print_info "View your repository at: https://github.com/tochratana/deploy"
else
    print_error "Failed to push. Please check your git configuration."
    exit 1
fi

print_success "All done!"
