import glob
import os

import jinja2


def main():
    base_path = os.path.abspath(os.path.dirname(__file__))
    template_path = os.path.join(base_path, 'src')
    env = jinja2.Environment(loader=jinja2.FileSystemLoader(template_path))
    for file_path in glob.glob(os.path.join(template_path, '*.html')):
        _, _, file_name = file_path.partition(template_path)
        file_name = file_name.lstrip(os.path.sep)
        if file_name.startswith('_'):
            continue
        open(os.path.join(base_path, 'gh-pages', file_name), 'w+').write(
            env.get_template(file_name).render())


main()
