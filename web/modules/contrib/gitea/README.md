# Gitea

This module adds a connection to gitea.

Out of the box it allows to retrieve information about the configured repository:
* Last updated
* Branches
* Open Pull Requests

It can be used as a service to make a deeper integration with gitea.

## Install

composer require drupal/gitea

Install as usual

## Usage

Provide a link to the gitea server, add a repository and an api key at 
/admin/config/development/gitea