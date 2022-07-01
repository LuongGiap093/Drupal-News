<?php

namespace Drupal\resume\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

class ResumeForm extends FormBase {

  public function getFormId() {
    // TODO: Implement getFormId() method.
    return 'resume_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['candidate_name'] = [
      '#type' => 'textfield',
      '#title' => t('Candidate Name:'),
      '#required' => TRUE,
    ];
    $form['candidate_mail'] = [
      '#type' => 'email',
      '#title' => t('Email ID:'),
      '#required' => TRUE,
    ];
    $form['candidate_number'] = [
      '#type' => 'tel',
      '#title' => t('Mobile no'),
    ];
    $form['candidate_dob'] = [
      '#type' => 'date',
      '#title' => t('DOB'),
      '#required' => TRUE,
    ];
    $form['candidate_gender'] = [
      '#type' => 'select',
      '#title' => ('Gender'),
      '#options' => [
        'Female' => t('Female'),
        'male' => t('Male'),
      ],
    ];
    $form['candidate_confirmation'] = [
      '#type' => 'radios',
      '#title' => ('Are you above 18 years old?'),
      '#options' => [
        'Yes' => t('Yes'),
        'No' => t('No'),
      ],
    ];
    $form['candidate_copy'] = [
      '#type' => 'checkbox',
      '#title' => t('Send me a copy of the application.'),
    ];
    $form['actions']['#type'] = 'actions';
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Save'),
      '#button_type' => 'primary',
    ];
    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    foreach ($form_state->getValues() as $key => $value) {
      \Drupal::messenger()->addMessage($key . ': ' . $value);
    }
  }

  public function validateForm(array &$form, FormStateInterface $form_state) {
    if (strlen($form_state->getValue('candidate_name')) == 'Luong') {
      $form_state->setErrorByName('candidate_name',
        $this->t('Khong duoc de ten luong :)'));
    }
  }

}
