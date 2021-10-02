from kivy.app import App
from kivy.uix.label import Label

from kivy.core.text import LabelBase, DEFAULT_FONT
from kivy.resources import resource_add_path

# フォントの場所
# Macは /System/Library/Fonts

# 日本語フォントの指定
resource_add_path('/System/Library/Fonts')
LabelBase.register(DEFAULT_FONT, 'ヒラギノ角ゴシック W0.ttc')

# App().run()

class TextApp(App):
    def build(self):
        return Label(text='こんにちは')

TextApp().run()