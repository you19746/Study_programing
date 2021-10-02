from kivy.app import App
from kivy.uix.label import Label

from kivy.core.text import LabelBase, DEFAULT_FONT
from kivy.resources import resource_add_path

# フォントの場所
# Macは /System/Library/Fonts

# 日本語フォントの指定
resource_add_path('/System/Library/Fonts')
LabelBase.register(DEFAULT_FONT, 'Hiragino Sans GB.ttc')

# App().run()

class TestApp(App):
    pass

if __name__=='__main__':
    TestApp().run()