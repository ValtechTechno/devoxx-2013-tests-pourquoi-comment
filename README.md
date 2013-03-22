# Les tests : quoi et comment

Présentation sur les tests, leurs intérêts et les best-practices en la matière.

Le système de slides provient de Mozilla : https://github.com/codepo8/mozilla-presentation-templates/tree/master/html5

MIT License


## Demo git bisect

git checkout demo-bisect
# Initialize bisection between 2 commits: a bad and a good
git bisect start demo-bisect master
# Run bisection with a script
git bisect run ./bisect.sh
# Faulty commit found: visualize it
git bisect log
git bisect visualize
git bisect view  # Equivalent
git bisect view -p
git bisect view --stat
DISPLAY=:0 git bisect view
# Get out of bisection
git bisect reset
