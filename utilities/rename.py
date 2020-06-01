import os

def main():
  path = '/Users/sergiorodriguez/Downloads/reversa/'
  filenames = []
  for file in os.listdir(path):
    filenames.append(file)
  filenames = sorted(filenames, reverse=True)

  os.chdir(path)
  for i in range(len(filenames)):
    newname = 'Archivo '+str(1-i+len(filenames)).zfill(5)+'.png'
    print(newname)
    os.rename(filenames[i],newname)

if __name__ == '__main__':
  main()