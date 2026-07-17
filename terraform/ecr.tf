resource "aws_ecr_repository" "backend" {
  name                 = "notes-backend"
  image_tag_mutability = "MUTABLE"
}

resource "aws_ecr_repository" "frontend" {
  name                 = "notes-frontend"
  image_tag_mutability = "MUTABLE"
}