<?php

namespace Drupal\optimize_config_storage;

use Drupal\Core\Config\DatabaseStorage;

define('__CONFIG_MEMORY__', '__CONFIG_MEMORY__');
define('__EMPTY_COLLECTION__', '__EMPTY_COLLECTION__');
/**
 *
 */
class OptimizeConfigMemoryStorage extends DatabaseStorage {

  /**
   * @return array|mixed
   */
  protected function autoloadConfig() {
    $config = &drupal_static(__CONFIG_MEMORY__);
    if (empty($config)) {
      $result = $this->connection->query('SELECT [data], [name], [collection] FROM {' . $this->connection->escapeTable($this->table) . '}', [], $this->options)
        ->fetchAll();
      foreach ($result as $item) {
        $config[$item->name][$item->collection ?: __EMPTY_COLLECTION__] = $item->data;
      }
    }
    return $config;
  }

  /**
   * @return string
   */
  protected function getCollection() {
    return $this->collection ?: __EMPTY_COLLECTION__;
  }

  /**
   * @param $name
   * @return array|bool|mixed
   */
  public function read($name) {
    $config = $this->autoloadConfig();
    $data = FALSE;
    $collection = $this->getCollection();
    if (isset($config[$name][$collection])) {
      $data = $this->decode($config[$name][$collection]);
    }
    return $data;
  }

  /**
   * @param $name
   * @param $data
   * @return bool
   */
  protected function doWrite($name, $data) {
    drupal_static_reset(__CONFIG_MEMORY__);
    return parent::doWrite($name, $data);
  }

  /**
   * @param $name
   * @param $new_name
   * @return bool
   */
  public function rename($name, $new_name) {
    drupal_static_reset(__CONFIG_MEMORY__);
    return parent::rename($name, $new_name);
  }

  /**
   * @param $prefix
   * @return bool
   */
  public function deleteAll($prefix = '') {
    drupal_static_reset(__CONFIG_MEMORY__);
    return parent::deleteAll($prefix);
  }

  /**
   * @param $name
   * @return bool
   */
  public function delete($name) {
    drupal_static_reset(__CONFIG_MEMORY__);
    return parent::delete($name);
  }

  /**
   * @param $name
   * @return bool
   */
  public function exists($name) {
    drupal_static_reset(__CONFIG_MEMORY__);
    return parent::exists($name);
  }

  /**
   * @param array $names
   * @return array
   */
  public function readMultiple(array $names) {
    $list = [];
    $collection = $this->getCollection();
    $config = $this->autoloadConfig();
    foreach ($names as $name) {
      if (isset($config[$name][$collection])) {
        $list[$name] = $this->decode($config[$name][$collection]);
      }
    }
    return $list;
  }

  /**
   * @param $prefix
   * @return array
   */
  public function listAll($prefix = '') {
    $collection = $this->getCollection();
    $config = $this->autoloadConfig();
    $list = [];
    foreach ($config as $key => $conf) {
      if (str_starts_with($key, $prefix) && array_key_exists($collection, $conf)) {
        $list[$key] = $key;
      }
    }
    return $list;
  }

}
