#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Update and upgrade apt packages
echo "Updating and upgrading apt packages..."
sudo apt-get update -y
sudo apt-get upgrade -y

# Install Node.js and npm
echo "Installing Node.js and npm..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install nginx
echo "Installing nginx..."
sudo apt-get install -y nginx

# Install pm2 to run node server in background
echo "Installing pm2..."
sudo npm install pm2 -g

echo "Setup script finished successfully!"
