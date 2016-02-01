<?php
namespace QaApp\Controllers;
use QaApp\Models\Answer;
use QaApp\Models\Question;

/**
 * @RoutePrefix("/v1/questions")
 */
class QuestionController extends ControllerBase
{
    /**
     * @Get("/")
     */
    public function listAction()
    {
        $type = $this->request->get("type", "string", "all");
        $questions = Question::findAllByType($type);
        return $questions ? $questions->toArray() : [];
    }

    /**
     * @Post("/", name="createQuestion")
     */
    public function createQuestionAction()
    {
        $data = $this->request->getJsonRawBody(true);

        if(!is_array($data))
        {
            $this->response->setStatusCode(404);

            return ["error" => "invalid params"];
        }

        $question = new Question();
        $question->assign($data);
        $res = $question->save();

        if($res === false)
        {
            $this->response->setStatusCode(503);
            return ["error" => "server error"];
        }

        $this->response->setStatusCode(201);
        return $question->toArray();
    }

    /**
     * @Get("/{id:[0-9]+}", name="get")
     */
    public function getAction($id)
    {
        $question = Question::findFirst($id);

        if(!$question)
        {
            $this->response->setStatusCode(404);

            return ["error" => "invalid question id"];
        }

        return $question->toArray();
    }

    /**
     * @Get("/{id:[0-9]+}/answers", name="getAnswers")
     */
    public function getAnswersAction($id)
    {
        $question = Question::findFirst($id);

        if(!$question)
        {
            $this->response->setStatusCode(404);

            return ["error" => "invalid question id"];
        }

        return $question->getAnswers()->toArray();
    }

    /**
     * @Post("/{id:[0-9]+}/answers", name="createAnswer")
     */
    public function createAnswerAction($id)
    {
        $question = Question::findFirst($id);
        $data = $this->request->getJsonRawBody(true);

        if(!$question || ! is_array($data))
        {
            $this->response->setStatusCode(404);

            return ["error" => "invalid params"];
        }
        $question->question_status = "answered";
        $answer = new Answer();
        $answer->assign($data);

        $res = ($answer->save() && $question->save());

        if($res === false)
        {
            $this->response->setStatusCode(503);
            return ["error" => "server error"];
        }

        $this->response->setStatusCode(201);
        return $answer->toArray();
    }

}

