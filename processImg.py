from PIL import Image


def generate_icons(input_file):
    sizes = [(16, 16), (48, 48), (128, 128)]
    for size in sizes:
        img = Image.open(input_file)
        img = img.resize(size, Image.LANCZOS)
        img.save(f'icon{size[0]}.png')


# 替换 'icon.png' 为你的输入文件名
generate_icons('icon.png')
