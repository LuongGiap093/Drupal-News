<?php

namespace Drupal\gitea;

use Drupal;
use Drupal\Core\Config\StorageInterface;
use Exception;

/**
 * Gitea service.
 */
class Gitea {

  protected $repo_url;
  protected $repo;
  protected $api_key;

  public function __construct() {
    $config = \Drupal::config('gitea.settings');
    $this->repo = $config->get('repo');
    $this->repo_url = $config->get('repo_url');
    $this->api_key = $config->get('api_key');
  }


  /**
   * Get a repository.
   */
  public function getRepo() {
    return $this->sendRequest('/repos/' . $this->repo, []);
  }

  /**
   * Get a repository.
   */
  public function getDefaultBranch() {
    $repo = $this->getRepo();
    return $repo->default_branch;
  }

  /**
   * Get all branches for a repository.
   */
  public function getBranches() {
    return $this->sendRequest('/repos/' . $this->repo . '/branches', []);
  }

  /**
   * Get all branches for a repository
   * as a options.
   */
  public function getBranchesAsOptions() {
    $options = [];
    if ($branches = $this->getBranches()) {
      foreach($branches as $branch) {
        $key = $branch->name;
        $options[$key] = $key;
      }
    }
    return $options;
  }

  /**
   * Create a new branch
   *
   * @param string $new_branch
   * @param string $old_branch
   * @return mixed
   */
  public function createBranch(string $new_branch, string $old_branch = '') {
    $data['json']['new_branch_name'] = $new_branch;
    if ($old_branch) $data['json']['old_branch_name'] = $old_branch;
    return $this->sendRequest('/repos/' . $this->repo . '/branches', $data, 'post');
  }

  /**
   * Delete a branch
   *
   * @param string $branch
   * @return mixed
   */
  public function deleteBranch(string $branch) {
    return $this->sendRequest('/repos/' . $this->repo . '/branches/' . $branch, [], 'delete');
  }

  /**
   * Create a new file
   *
   * @param string $file_path
   * @param string $file_content
   * @param string $merge_from
   * @param string $new_branch
   * @param string $message
   * @return mixed
   */
  public function createFile(string $file_path, string $file_content, string $merge_from, string $message) {
    $data['json'] = [
      'branch' => $merge_from,
      'content' => base64_encode($file_content),
      'message' => $message,
    ];
    return $this->sendRequest('/repos/' . $this->repo . '/contents/' . $file_path, $data, 'post');
  }

  public function getFile(string $file_path, string $branch) {
    $data['query'] = [
      'ref' => $branch,
    ];
    return $this->sendRequest('/repos/' . $this->repo . '/contents/' . $file_path, $data, 'get');
  }


  /**
   * Update a file
   *
   * @param string $file_path
   * @param string $file_content
   * @param string $sha
   * @param string $merge_from
   * @param string $new_branch
   * @param string $message
   * @return mixed
   */
  public function updateFile(string $file_path, string $file_content, string $sha, string $merge_from, string $message) {
    $data['json'] = [
      'branch' => $merge_from,
      'content' => base64_encode($file_content),
      'message' => $message,
      'sha' => $sha,
    ];
    return $this->sendRequest('/repos/' . $this->repo . '/contents/' . $file_path, $data, 'put');
  }

  /**
   * Update a file
   *
   * @param string $file_path
   * @param string $sha
   * @param string $merge_from
   * @param string $new_branch
   * @param string $message
   * @return mixed
   */
  public function deleteFile(string $file_path, string $sha, string $merge_from, string $message) {
    $data['json'] = [
      'branch' => $merge_from,
      'message' => $message,
      'sha' => $sha,
    ];
    return $this->sendRequest('/repos/' . $this->repo . '/contents/' . $file_path, $data, 'delete');
  }

  /**
   * Create a Pull Request.
   *
   * @param string $base
   * @param string $head
   * @param string $commit_message
   * @return mixed
   */
  public function createPullRequest(string $base, string $head, string $commit_message) {
    $data['json'] = [
      'base' => $base,
      'head' => $head,
      'body' => $commit_message,
      'title' => 'Config patch',
    ];
    return $this->sendRequest('/repos/' . $this->repo . '/pulls', $data, 'post');
  }


  /**
   * Send the request
   *
   * @param [string] $endpoint
   * @param [array] $data
   * @param string $method
   * @return mixed
   */
  public function sendRequest($endpoint, $data = [], $method = 'get') {
    $client = \Drupal::httpClient();

    $url = $this->repo_url . '/api/v1' . $endpoint;

    $data['query']['access_token'] = $this->api_key;

    try {
      $request = $client->request($method, $url, $data);
      return json_decode($request->getBody());
    }
    catch (Exception $e) {
      Drupal::messenger()->addError($e->getMessage());
    }
    return FALSE;

  }

}
