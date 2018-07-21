# Instalacja
1. Utwórz host wspierający html5Mode (przykładowa konfiguracja poniżej).
1. Utwórz pliki `sources/app/config/angular.js` i `sources/app/config/environment.js` w oparciu o pliki `sources/app/config/angular.sample.js` i `sources/app/config/environment.sample.js` i dostosuj ich wartości do swoich potrzeb.
2. Zainstaluj zależności za pomocą komendy `npm install`.

## Przykładowa konfiguracja nginx pod html5Mode
```
server {
	listen 80;
	server_name zavijava-angularjs.d;
	root /home/user/web/zavijava-angularjs/www;
	index index.html;

	location / {
		add_header Cache-Control "no-store, no-cache, must-revalidate, post-check=0, pre-check=0";
		add_header Pragma "no-cache";
		expires -1;
		try_files $uri$args $uri$args/ $uri $uri/ /index.html =404;
	}

	error_log /home/user/.config/nginx/logs/zavijava-angularjs.error.log;
	access_log /home/user/.config/nginx/logs/zavijava-angularjs.access.log;
}
```

# Dewelopment
## Routingi
Aby dodać nowy routing należy:
1. Utworzyć bundle w `sources/bundles` lub rozszerzyć istniejący.
2. Dodać kontroler i/lub widok odpowiednio do katalogu `controllers` i `views`.
3. Zadeklarować w `$routeProvider` w konfiguracji w pliku `sources/app/app.js` routing, zachowując kolejność alfabetyczną (z wyjątkiem problemów z działaniem routingów z parametrami), oraz mając na uwadze notację `Controller As`, oraz dodatkowe parametry, tj. `title` czy `requireLogin`:
```
$routeProvider.when(...).when('/nowyRouting', {
	templateUrl: `app/bundles/nowy/views/routing.html${VERSION}`,
	controller: 'nowyRoutingCtrl',
	controllerAs: 'nowyRouting',
	title: 'Nowy routing',
	requireLogin: true
}).(...)
```

## Providery/Fabryki
Aby dodać nową fabrykę lub providera należy:
1. Dodać fabrykę lub providera do katalogu `factories` lub `providers` w bundlu, w którym będzie wykorzystywany, lub w bundlu `app`, jeśli będzie wykorzystywany w wielu bundlach.
2. Dodać go do zależności w pliku `sources/app/app/js`, obok pozostałych fabryk czy providerów, zachowując kolejność alfabetyczną w ramach fabryk i providerów:
```
angular.module('app', [
	(...)

	'notifyFactory',
	'nowyFactory',
	(...)
	'ajaxProvider',
	'nowyProvider',

	(...)
]).(...)
```

## Zależności
Zależności należy instalować przez manager `npm`.

### Skrypty
Skrypty należy dopisać do tablicy z pozostałymi plikami w `uglifyTasks` w pliku `gruntfile.js`, zachowując kolejność alfabetyczną (możliwe są uzasadnione wyjątki):
```
uglifyTasks = {
	(...),
	global: {
		files: {
			[jsAssetsFilePath]: [
				(...),
				'node_modules/angular-route/angular-route.js',
				'node_modules/nowa/zależność.js',
				'node_modules/ngstorage/ngStorage.js',
				(...)
			]
		}
	}
},
```

### Style
Style należy importować w pliku `sources/assets/styles/partials/_vendors.sass`. W tym samym pliku należy przeciążać zmienne.

### Pozostałe pliki
Pozostałe pliki należy dopisać do `copyTasks` w pliku `gruntfile.js`, zachowując kolejność alfabetyczną:
```
copyTasks = {
	vendors: {
		files: [
			(...),
			{
				cwd: 'node_modules/nowa/zależność',
				src: '**',
				dest: 'www/assets/nowa/zależność',
				expand: true
			},
			(...)
		]
	}
},
```
