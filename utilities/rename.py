import os
def main():
  path = str(input('Ingresa el path a la carpeta de imágenes: '))
  os.chdir(path)
  filenames = os.listdir('./')
  filenames = sorted(filenames, reverse=True)
  
  for i in range(len(filenames)):
    print(i+len(filenames)-1)
    newname = 'a'+str(i+len(filenames)-1).zfill(5)+'.png'
    os.rename(filenames[i],newname)

if __name__ == '__main__':
  main()