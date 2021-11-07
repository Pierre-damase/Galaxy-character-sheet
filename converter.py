import re



def main():
    with open("galaxy.css","r") as filin:
        with open("galaxy-roll20.css", "w") as filout :
            for line in filin.readlines():
                if re.match("\.", line):
                    filout.write(line.replace(".",".sheet-"))
                elif re.match("#", line):
                    filout.write(line.replace("#","#sheet-"))
                elif re.match('body', line):
                    filout.write(line.replace('body', '.charsheet'))
                else:
                    filout.write(line)
            pass
    pass

if __name__ == "__main__":
    main()
    pass

