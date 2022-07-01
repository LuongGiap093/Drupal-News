<?php

namespace Drupal\gitea\Form;

use Drupal;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;

/**
 * Configure Config Patch Gitea settings for this site.
 */
class SettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'gitea_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['gitea.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    $form['repo_url'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Repository url'),
      '#default_value' => $this->config('gitea.settings')->get('repo_url'),
    ];
    $form['repo'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Repository'),
      '#default_value' => $this->config('gitea.settings')->get('repo'),
    ];
    $form['api_key'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Api key'),
      '#default_value' => $this->config('gitea.settings')->get('api_key'),
    ];
    if (
      $this->config('gitea.settings')->get('repo_url') &&
      $this->config('gitea.settings')->get('repo') &&
      $this->config('gitea.settings')->get('api_key')
    ) {
      $api = Drupal::service('gitea.client');
      $repo = $api->getRepo();
      $form['repo_details'] = [
        '#type' => 'details',
        '#title' => $this->t('Repo information'),
      ];
      $form['repo_details']['url'] = [
        '#type' => 'link',
        '#title' => $repo->html_url,
        '#url' => Url::fromUri($repo->html_url),
      ];
      $form['repo_details']['last_updated'] = [
        '#type' => 'item',
        '#title' => $this->t('Last Updated'),
        '#description' => $repo->updated_at,
      ];
      $form['repo_details']['branches'] = [
        '#type' => 'select',
        '#title' => $this->t('Branches'),
        '#options' => $api->getBranchesAsOptions(),
        '#default_value' => $repo->default_branch,
      ];
      $form['repo_details']['open_pr_counter'] = [
        '#type' => 'item',
        '#title' => $this->t('Open Pull Requests'),
        '#description' => $repo->open_pr_counter,
      ];

    }

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->config('gitea.settings')
      ->set('repo_url', $form_state->getValue('repo_url'))
      ->set('repo', $form_state->getValue('repo'))
      ->set('api_key', $form_state->getValue('api_key'))
      ->save();
    parent::submitForm($form, $form_state);
  }

}
