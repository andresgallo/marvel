<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	 
	private function moreDataForMarvelTest(){
		$xtraData = array(
			'siteName' => 'Marvel Digital Coding Exercise',
			'exerciseBy' => 'Andres Gallo',
			'FCPATH' => SELF
			);
		
		return $xtraData;	
	}
	
	private function getComicsForChar($heroId){
		$this->load->spark('curl/1.2.1');

		// Set advanced options in simple calls
		// Can use any of these flags http://uk3.php.net/manual/en/function.curl-setopt.php
		
		$apiData = $this->curl->simple_get('http://api.marvel.com/browse/digitalcomics/print', array (
            'byType' => 'character',
            'offset' => '0',
            'byId' => $heroId
        ));
		return $apiData;			
	}
	 
	public function index()
	{
		//Gather Data
		$dataForTpl = array(
				'title' => 'browseMenu',
				'alphabet' => range('A', 'Z')
		);
		$moreDataForTpl = $this->moreDataForMarvelTest();
		$dataForTpl = array_merge($moreDataForTpl,$dataForTpl);
		
		//DO TEMPLATING
		//LOADING MUSTACHE WHICH CAN BE RECYCLED ON FRONT END WHERE MUSTACHE IS ALSO AVAILABLE
		$this->load->spark('mustache_spark/0.0.1');
		$this->mustache_spark->set_master_template('main');
		$this->mustache_spark->merge_data($dataForTpl);
		$this->mustache_spark->merge_template(
			array(
				'header' => 'header',
				'content' => 'subView/browseMenu',
				'footer' => 'footer'
			)
		);
		
		$this->mustache_spark->render();
	}
	
	public function comicForCharacter($heroID){
		//Fetch API DATA
		$APIData = $this->getComicsForChar($heroID);
		
		//Count Results
		$APIDataPhp = json_decode($APIData,true);
		print_r(count($APIDataPhp['data']['results']));
		$APIResultsLn = count($APIDataPhp['data']['results']);
		
		//Merge Data
		$dataForTpl = array(
				'title' => 'browseMenu',
				'alphabet' => range('A', 'Z'),
				'APIDataForChar' => $APIData, ///MUSTACHE ESCAPES CHARACTERS, THE TEMPLATES CALL THIS IN A MUSTACHE WAY
				'APIDataForCharP' => $APIDataPhp,
				'charId' => $heroID 
		);
		$moreDataForTpl = $this->moreDataForMarvelTest();
		$dataForTpl = array_merge($moreDataForTpl,$dataForTpl);
		
		//DO TEMPLATING
		//LOADING MUSTACHE WHICH CAN BE RECYCLED ON FRONT END WHERE MUSTACHE IS ALSO AVAILABLE
		$this->load->spark('mustache_spark/0.0.1');
		$this->mustache_spark->set_master_template('main');
		$this->mustache_spark->merge_data($dataForTpl);
		$this->mustache_spark->merge_template(
			array(
				'header' => 'header',
				'content' => 'subView/comicsForHero',
				'footer' => 'footer'
			)
		);
		
		$this->mustache_spark->render();
	}
	
	public function eventful(){
		$this->load->spark('curl/1.2.1');
		$key = 'tq3kCFRgDpDHgCxS';
		// Set advanced options in simple calls
		// Can use any of these flags http://uk3.php.net/manual/en/function.curl-setopt.php
		
		$apiData = $this->curl->simple_get('http://api.marvel.com/browse/characters', array (
            'byType' => 'character',
            'offset' => '0'
        ));
		
		echo $apiData;
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */