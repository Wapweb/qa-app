<?php
namespace QaApp\Controllers;

use Phalcon\Mvc\Controller;
use \Phalcon\Mvc\Dispatcher;

class ControllerBase extends Controller
{
    public function beforeExecuteRoute(Dispatcher $dispatcher)
    {
        $this->view->disable();

        $this->response->setContentType('application/json', 'UTF-8');
        $this->response->setHeader("Expires","Sat, 01 Jan 2005 00:00:00 GMT");
        $this->response->setHeader("Last-Modified",gmdate( "D, d M Y H:i:s")."GMT");
        $this->response->setHeader("Pragma","no-cache");
        $this->response->setHeader("Cache-Control","no-cache, must-revalidate");
        $this->response->setHeader("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, DELETE");
        $this->response->setHeader("Access-Control-Allow-Origin","*");
        $this->response->setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    }

    public function afterExecuteRoute(Dispatcher $dispatcher)
    {
        sleep(2);
        $data = $dispatcher->getReturnedValue();
        $responseData = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

        $this->response->setContent($responseData);

        return $this->response->send();
    }
}
