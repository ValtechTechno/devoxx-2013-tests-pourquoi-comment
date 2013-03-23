# Les tests : pourquoi et comment ?

Présentation sur les tests, leurs intérêts ainsi qu’un ensemble de suggestions et meilleures pratiques tirées de notre expérience chez Mappy.

Les auteurs sont Axel Haustant, Xavier Renaudin et Grégory Paul.

Cette présentation inclut 3 démos, la première sur FitNesse, la seconde sur CasperJS et la troisième sur l’intérêt de ré-utiliser ces tests automatisés pour piloter son git bisect.

## Arboresence

- demo-app : l’application testée

- demo-casperjs : les tests CasperJS

- demo-fitnesse : les tests FitNesse

- slides : la présentation au format HTML

- slides-references : quelques références présent dans les slides

- tools : les scripts de génération d’un PDF depuis les slides HTML


## Démo FitNesse

Lancer `./demo-app/server.sh` et puis `firefox localhost:8888` pour explorer l’application testée.

Créer les artifacts maven via `(cd demo-fitnesse/IntegrationTests && mvn clean install)` puis démarrer le serveur via `./demo-fitnesse/server.sh`

Lancer ensuite un Firefox via `firefox localhost:8889` puis éxécuter le test FitNesse.


## Démo CasperJS

Lancer `./demo-app/server.sh` et puis `firefox localhost:8888` pour explorer l’application testée.

Lancer les tests CasperJS via `cd demo-casperjs && ./launch.sh`.

Vous pouvez les lancer en parallèle via `parallel-launch.sh`.


## Démo git bisect

`git checkout demo-bisect`

Initialize bisection between 2 commits: a bad and a good

`git bisect start demo-bisect master`

Run bisection with a script

`git bisect run ./bisect.sh`

Faulty commit found: visualize it

`git bisect log`

`git bisect visualize`

`git bisect view` # Equivalent

`git bisect view -p`

`git bisect view --stat`

`DISPLAY=:0 git bisect view`

Get out of bisection

`git bisect reset`


# Sources

Les slides sont bâti depuis Shower (http://shwr.me/) via la présentation de Mozilla (https://github.com/codepo8/mozilla-presentation-templates/tree/master/html5). La license est de type MIT.

