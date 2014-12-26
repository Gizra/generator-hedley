# generator-hedley [![Build Status](https://travis-ci.org/Gizra/generator-hedley.svg?branch=master)](https://travis-ci.org/Gizra/generator-hedley)

> Scaffold a headless Drupal backend, Angular app client, and Behat tests

Hedley is a [yeoman generator](http://yeoman.io/) that scaffolds a headless Drupal backend, Angular app client, and Behat tests. Its a great starting point for learning and developing fully decoupled websites, that follow _best practices_, and includes automatic testing using Behat.

## Getting Started

### Prerequisites

* Yo (``npm install -g yo``)
* [Drush](https://github.com/drush-ops/drush)
* [Composer](https://getcomposer.org/doc/00-intro.md#globally) installed globally, for Behat dependencies to be setup

### Installation

To install generator-hedley from npm, run:

```bash
npm install -g generator-hedley
```

Finally, initiate the generator:

```bash
yo hedley
```

## CLI

You can scaffold a new app with no user interaction, for example:
```
yo hedley --skip-install --project-name=skeleton --github-repo=https://github.com/Foo/skeleton --db=skeleton --db-user=root --db-pass=root --drupal-url=http://localhost/skeleton/www
```

## Contribute

In order to develop ``generator-hedley`` and provide pull requests the following steps should be taken:

1. Git clone your fork locally.
2. ``npm install`` inside the new directory
3. ``npm link`` - This makes your local system sync with the changes you make
4. ``mkdir skeleton``
5. Inside the new directory, initiate ``yo hedley``, and make sure to keep the default project name to ``skeleton``
6. ``cp sync_hedley.example.sh sync_hedley.sh``
7. Edit ``sync_hedley.sh`` and point the the ``GENERATOR_FOLDER`` variable to the place where ``generator-hedley`` is located
8. From now on, you may easily sync back your changes back to the forked ``generator-hedley`` by executing ``./sync_hedley.sh``

## Credits

[Gizra](https://gizra.com)

## License

MIT
