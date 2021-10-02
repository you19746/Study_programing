import tkinter
from tkinter import messagebox
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from time import sleep

#ボタンがクリックされたら実行
def button_click():
    driver = webdriver.Chrome(ChromeDriverManager().install())
#   input_value = input_box.get()
#   messagebox.showinfo("クリックイベント",input_value + "が入力されました。")

#ウインドウの作成
root = tkinter.Tk()
root.title("Python GUI")
root.geometry("800x600")

#入力欄の作成
input_box = tkinter.Entry(width=40)
input_box.place(x=10, y=100)

#ラベルの作成
input_label = tkinter.Label(text="ラベル")
input_label.place(x=10, y=70)

#ボタンの作成
button = tkinter.Button(text="実行ボタン",command=button_click)
button.place(x=10, y=130)

#ウインドウの描画
root.mainloop()