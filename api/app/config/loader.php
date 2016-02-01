<?php
$loader = new \Phalcon\Loader();

$loader->registerNamespaces([
    "QaApp\\Controllers" => $config->application->controllersDir,
    "QaApp\\Models" => $config->application->modelsDir
])->register();
