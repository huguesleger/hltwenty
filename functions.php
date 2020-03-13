<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

/**
 * If you are installing Timber as a Composer dependency in your theme, you'll need this block
 * to load your dependencies and initialize Timber. If you are using Timber via the WordPress.org
 * plug-in, you can safely delete this block.
 */
$composer_autoload = __DIR__ . '/vendor/autoload.php';
if ( file_exists( $composer_autoload ) ) {
	require_once $composer_autoload;
	$timber = new Timber\Timber();
}


/**
 * This ensures that Timber is loaded and available as a PHP class.
 * If not, it gives an error message to help direct developers on where to activate
 */
if ( ! class_exists( 'Timber' ) ) {

	add_action(
		'admin_notices',
		function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		}
	);

	add_filter(
		'template_include',
		function( $template ) {
			return get_stylesheet_directory() . '/static/no-timber.html';
		}
	);
	return;
}

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array( 'templates', 'views' );

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;


/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class StarterSite extends Timber\Site {
	/** Add timber support. */
	public function __construct() {
		add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
		add_filter( 'timber/context', array( $this, 'add_to_context' ) );
		add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		parent::__construct();
	}
	/** This is where you can register custom post types. */
	public function register_post_types() {

	function case_study() {
  	$labels = array(
  		'name'               => 'Case Studies',
  		'singular_name'      => 'Réalisation',
  		'menu_name'          => 'Case Studies',
  		'name_admin_bar'     => 'Case Studies',
  		'add_new'            => 'Ajouter une nouvelle réalisation',
  		'add_new_item'       => 'Ajouter une réalisation',
  		'new_item'           => 'Nouvelle réalisation',
  		'edit_item'          => 'Editer une réalisation',
  		'view_item'          => 'Voir une réalisation',
  		'all_items'          => 'Toute les réalisations',
  		'search_items'       => 'Rechercher une réalisation',
  		'parent_item_colon'  => 'Parent Item',
  		'not_found'          => 'Aucune réalisation',
  		'not_found_in_trash' => 'Aucune réalisation dans la corbeille'
  	);

  	$args = array(
  		'labels'             => $labels,
      'description'        => __( 'Description.', 'your-plugin-textdomain' ),
		'public'             => true,
  		'publicly_queryable' => true,
  		'show_ui'            => true,
  		'show_in_menu'       => true,
      'show_in_rest'       => true,
  		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'case-study' ),
  		'capability_type'    => 'post',
      'menu_icon'          => 'dashicons-images-alt2',
  		'has_archive'        => false,
  		'hierarchical'       => false,
  		'menu_position'      => 5,
  		'supports'           => array( 'title', 'editor', 'author', 'excerpt', 'thumbnail','revisions'),
  	);

  	register_post_type( 'case-study', $args );
  }
  case_study();
	}

	/** This is where you can register custom taxonomies. */
	public function register_taxonomies() {

  function case_study_taxonomies(){

    //add new taxonomy hierarchical
    $labels = array(
           'name'=>'Categories',
           'singular_name'=>'Categorie',
           'search_items'=>'Search Categories',
           'all_items'=>'All Categories',
           'parent_item'=>'Parent Categorie',
           'parent_item_colon'=>'Parent Categorie:',
           'edit_item'=>'Edit Categorie',
           'update_item'=> 'Update Categorie',
           'add_new_item'=>'Add new Categorie',
           'new_item_name'=>'New Categorie name',
           'menu_name'=>'Categories'
                 );
    $args = array(
           'hierarchical'=> true,
           'labels'=>$labels,
           'show_ui'=> true,
           'show_in_rest'=> true,
           'show_admin_column'=>true,
           'query_var'=> true,
           'rewrite'=> array( 'slug' => 'case-study-type' )
    );
    register_taxonomy('case-study-type', array('case-study'), $args);
  }
  case_study_taxonomies();
	}

	/** This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context( $context ) {
		$context['foo']   = 'bar';
		$context['stuff'] = 'I am a value set in your functions.php file';
		$context['notes'] = 'These values are available everytime you call Timber::context();';
		$context['menu']  = new Timber\Menu();
		$context['menu_footer']  = new Timber\Menu();
		$context['site']  = $this;
		$context['page_contact'] = is_page( 'contact' );
		$custom_logo_url = wp_get_attachment_image_url( get_theme_mod( 'custom_logo' ), 'full' );
		$context['custom_logo_url'] = $custom_logo_url; 
		return $context;
	}


	public function theme_supports() {
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		/*
		 * Enable support for Post Formats.
		 *
		 * See: https://codex.wordpress.org/Post_Formats
		 */
		add_theme_support(
			'post-formats',
			array(
				'aside',
				'image',
				'video',
				'quote',
				'link',
				'gallery',
				'audio',
			)
		);

		add_theme_support( 'menus' );

		/*
		* logo custum
		*/
		add_theme_support('custom-logo',array(
			'flex-height' => true,
		));

	}


	/** This Would return 'foo bar!'.
	 *
	 * @param string $text being 'foo', then returned 'foo bar!'.
	 */
	public function myfoo( $text ) {
		$text .= ' bar!';
		return $text;
	}

	/** This is where you can add your own functions to twig.
	 *
	 * @param string $twig get extension.
	 */
	public function add_to_twig( $twig ) {
		$twig->addExtension( new Twig\Extension\StringLoaderExtension() );
		$twig->addFilter( new Twig\TwigFilter( 'myfoo', array( $this, 'myfoo' ) ) );
		return $twig;
	}

}
/**
* Enqueue Font awesome
*/
function hl2020_enqueue_fontawesome() {
  wp_enqueue_script( 'fontawesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.1/js/all.min.js', array(), true );
}
add_action( 'wp_enqueue_scripts', 'hl2020_enqueue_fontawesome', 10 );

/* Enqueue Styles and Scripts */
function header_scripts()  { 
  wp_enqueue_style('styles', get_stylesheet_directory_uri() . '/public/css/styles.css');
}
add_action( 'wp_enqueue_scripts', 'header_scripts' );

function footer_scripts()  { 
wp_enqueue_script( 'hltwentyprogressbar', 'https://cdnjs.cloudflare.com/ajax/libs/progressbar.js/1.0.1/progressbar.min.js', array('jquery'), '', true );
wp_enqueue_script( 'hltwentyscrollreveal', 'https://unpkg.com/scrollreveal', array('jquery'), '', true );
wp_enqueue_script( 'hltwentyrellax', 'https://cdnjs.cloudflare.com/ajax/libs/rellax/1.10.0/rellax.min.js', array('jquery'), '', true );		
wp_enqueue_script( 'hltwentytweenmax', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js', array('jquery'), '', true );
wp_enqueue_script( 'hltwenty-timelinemax', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TimelineMax.min.js', array('jquery'), '', true );	
wp_enqueue_script( 'hltwenty-three', 'https://cdnjs.cloudflare.com/ajax/libs/three.js/99/three.min.js', array('jquery'), '', true );
wp_enqueue_script( 'swiper.bundle', get_template_directory_uri() . '/public/vendor/swiper.min.js');
wp_enqueue_script( 'vendor.bundle', get_template_directory_uri() . '/public/js/vendor-bundle.js');
wp_enqueue_script( 'script.bundle', get_template_directory_uri() . '/public/js/script-bundle.js');

//   wp_enqueue_script( 'app.bundle', get_template_directory_uri() . '/dist/js/app.bundle.js'); 
}
add_action( 'wp_footer', 'footer_scripts' );

new StarterSite();
