import gettext
import glob
import os
import sys

import jinja2


def main():
    _, theme, locale, build_path = sys.argv
    base_path = os.path.abspath(os.path.dirname(__file__))
    template_path = os.path.join(base_path, 'src')
    target_path = os.path.join(base_path, build_path, theme)
    try:
        os.makedirs(target_path)
    except OSError:  # directory exists
        pass
    env = jinja2.Environment(
        loader=jinja2.FileSystemLoader(template_path),
        extensions=['jinja2.ext.i18n'])
    env.install_gettext_translations(
        gettext.GNUTranslations(fp=open('po/{}.mo'.format(locale), 'rb')))
    kwargs = {
        'theme': theme,
        'locale': locale,
    }
    kwargs['class_name'] = {
        'win98': 'windows-98',
        'winxp-classic': 'windows-xp-classic',
        'winxp-green': 'windows-xp-green',
    }[theme]
    for file_path in glob.glob(os.path.join(template_path, '*.html')):
        _, _, file_name = file_path.partition(template_path)
        file_name = file_name.lstrip(os.path.sep)
        if file_name == '_index.html':
            # XXX redundant
            open(os.path.join(base_path, build_path, 'index.html'), 'w+').write(
                env.get_template(file_name).render(**kwargs).encode('utf-8'))
        if file_name.startswith('_'):
            continue
        open(os.path.join(target_path, file_name), 'w+').write(
            env.get_template(file_name).render(**kwargs).encode('utf-8'))


main()
